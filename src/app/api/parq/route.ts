import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import { Resend } from 'resend';
import { jsPDF } from 'jspdf';

// Initialize Google Drive API with OAuth 2.0
const getGoogleDriveClient = () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    'http://localhost'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
  });

  return google.drive({ version: 'v3', auth: oauth2Client });
};

// Generate PDF using jsPDF
const generatePDF = (formData: any): Buffer => {
  const doc = new jsPDF();
  const primaryColor = '#9c2b8a';
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  // Helper to add text with line wrapping
  const addText = (text: string, x: number, size: number = 10, color: string = 'black', maxWidth?: number) => {
    doc.setFontSize(size);
    doc.setTextColor(color);
    const lines = doc.splitTextToSize(text, maxWidth || pageWidth - 40);
    doc.text(lines, x, yPos);
    yPos += lines.length * size * 0.35 + 2;
  };

  // Title
  doc.setFontSize(24);
  doc.setTextColor(primaryColor);
  doc.text('Physical Activity Readiness', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;
  doc.text('Questionnaire (PAR-Q)', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  doc.setFontSize(10);
  doc.setTextColor('black');
  doc.text(`Submitted: ${new Date().toLocaleString('en-GB')}`, 20, yPos);
  yPos += 15;

  // Personal Information
  doc.setFontSize(16);
  doc.setTextColor(primaryColor);
  doc.text('Personal Information', 20, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setTextColor('black');
  addText(`Name: ${formData.name || 'N/A'}`, 20);
  addText(`Gender: ${formData.gender || 'N/A'}`, 20);
  addText(`Email: ${formData.email || 'N/A'}`, 20);
  addText(`Age: ${formData.age || 'N/A'}`, 20);
  addText(`Contact Number: ${formData.contactNumber || 'N/A'}`, 20);
  addText(`Next of Kin's Name: ${formData.nextOfKinName || 'N/A'}`, 20);
  addText(`Emergency Contact Number: ${formData.emergencyContactNumber || 'N/A'}`, 20);
  yPos += 10;

  // Health Screening Questions
  doc.setFontSize(16);
  doc.setTextColor(primaryColor);
  doc.text('Health Screening Questions', 20, yPos);
  yPos += 8;

  const questions = [
    'Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?',
    'Do you feel pain in your chest when you do physical activity?',
    'In the past month, have you had chest pain when you were not doing physical activity?',
    'Do you lose your balance because of dizziness or do you ever lose consciousness?',
    'Do you have a bone or joint problem (for example, back, knee or hip) that could be made worse by a change in physical activity?',
    'Is your doctor currently prescribing drugs (for example, water pills) for your blood pressure or heart condition?',
    'Do you know of any other reason why you should not do physical activity?',
  ];

  questions.forEach((question, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    const answer = formData[`question${index + 1}`]?.toUpperCase() || 'NOT ANSWERED';
    addText(`${index + 1}. ${question}`, 20, 10, 'black', pageWidth - 40);
    doc.setTextColor(primaryColor);
    doc.text(`   Answer: ${answer}`, 20, yPos);
    yPos += 8;
    doc.setTextColor('black');
  });

  // Participant Declaration - New Page
  doc.addPage();
  yPos = 20;

  doc.setFontSize(16);
  doc.setTextColor(primaryColor);
  doc.text('Participant Declaration', 20, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setTextColor('black');

  addText("Client's Signature:", 20);
  if (formData.clientSignature && formData.clientSignature.startsWith('data:image')) {
    // Embed the signature image
    try {
      doc.addImage(formData.clientSignature, 'PNG', 20, yPos, 80, 20);
      yPos += 25;
    } catch (e) {
      addText('[Signature image could not be embedded]', 20);
    }
  } else if (formData.clientSignature) {
    // Text signature
    doc.setFont('helvetica', 'italic');
    addText(formData.clientSignature, 20);
    doc.setFont('helvetica', 'normal');
  } else {
    addText('Not provided', 20);
  }
  addText(`Date: ${formatDate(formData.clientSignatureDate)}`, 20);
  yPos += 5;

  addText("Witness's Signature:", 20);
  if (formData.witnessSignature && formData.witnessSignature.startsWith('data:image')) {
    // Embed the signature image
    try {
      doc.addImage(formData.witnessSignature, 'PNG', 20, yPos, 80, 20);
      yPos += 25;
    } catch (e) {
      addText('[Signature image could not be embedded]', 20);
    }
  } else if (formData.witnessSignature) {
    // Text signature
    doc.setFont('helvetica', 'italic');
    addText(formData.witnessSignature, 20);
    doc.setFont('helvetica', 'normal');
  } else {
    addText('Not provided', 20);
  }
  addText(`Date: ${formatDate(formData.witnessSignatureDate)}`, 20);
  yPos += 10;

  // Liability Notice
  doc.setFontSize(9);
  doc.setTextColor('gray');
  addText(
    'Please note that no liability is accepted for any loss of or damage to any articles, which you may bring with you to classes. Equally, liability is not accepted for loss of or damage to motor vehicles or their contents and these are left at the owner\'s risk.',
    20,
    9,
    'gray',
    pageWidth - 40
  );
  yPos += 5;

  // Medical Confirmation
  addText(
    '"I confirm that where any medical condition, discomfort or injury which may be affected by physical activity applies or becomes applicable at any time when I am participating in a class, I am responsible for checking with my doctor to ensure I am able to participate in this activity."',
    20,
    9,
    'gray',
    pageWidth - 40
  );
  yPos += 10;

  // GDPR Consent
  doc.setFontSize(12);
  doc.setTextColor(primaryColor);
  doc.text('Data Protection & Privacy (GDPR Consent)', 20, yPos);
  yPos += 8;

  doc.setFontSize(9);
  doc.setTextColor('black');
  addText(
    'By submitting this form, the participant consents to Nick Binmore Dancing storing and processing their personal information in accordance with UK GDPR regulations. The data will be kept securely and used solely for the purpose of managing participation in dance classes and ensuring health and safety. The participant has the right to access, rectify, or request deletion of their personal data at any time.',
    20,
    9,
    'black',
    pageWidth - 40
  );
  addText(
    'For more information about how we handle data, please refer to our Privacy Policy at nickbinmoredancing.co.uk/privacy or contact us directly.',
    20,
    9,
    'black',
    pageWidth - 40
  );
  yPos += 10;

  // Final Declaration Fields
  doc.setFontSize(10);
  addText(`Full Name: ${formData.printName || 'N/A'}`, 20);
  addText(`Address: ${formData.address?.replace(/\n/g, ', ') || 'N/A'}`, 20);
  addText(`Post Code: ${formData.postCode || 'N/A'}`, 20);
  addText(`Date: ${formatDate(formData.declarationDate)}`, 20);
  yPos += 10;

  // Footer
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(9);
  doc.setTextColor('gray');
  doc.text('Nick Binmore Dancing', pageWidth / 2, yPos, { align: 'center' });
  yPos += 5;
  doc.text('IDTA Qualified Ballroom and Latin Dance Instructor', pageWidth / 2, yPos, { align: 'center' });
  yPos += 5;
  doc.text('This document contains sensitive personal information and should be stored securely.', pageWidth / 2, yPos, { align: 'center' });

  // Return PDF as Buffer
  const pdfOutput = doc.output('arraybuffer');
  return Buffer.from(pdfOutput);
};

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Initialize Google Drive
    const drive = getGoogleDriveClient();

    // Get PARQs folder ID from environment variable
    const parqsFolderId = process.env.GOOGLE_DRIVE_PARQS_FOLDER_ID;
    if (!parqsFolderId) {
      throw new Error('GOOGLE_DRIVE_PARQS_FOLDER_ID not configured');
    }

    // Generate PDF
    const pdfBuffer = generatePDF(formData);

    // Create file metadata
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `PARQ_${formData.name.replace(/\s+/g, '_')}_${timestamp}.pdf`;

    // Convert PDF buffer to stream for Google Drive upload
    const pdfStream = Readable.from([pdfBuffer]);

    // Upload PDF to Google Drive
    const fileMetadata = {
      name: fileName,
      parents: [parqsFolderId],
      mimeType: 'application/pdf',
    };

    const media = {
      mimeType: 'application/pdf',
      body: pdfStream,
    };

    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, webViewLink',
    });

    // Send email notification
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Check if all medical questions were answered "no"
      const allQuestionsNo = [
        formData.question1,
        formData.question2,
        formData.question3,
        formData.question4,
        formData.question5,
        formData.question6,
        formData.question7,
      ].every((answer) => answer === 'no');

      const medicalStatus = allQuestionsNo
        ? '✅ All medical questions answered NO'
        : '⚠️ One or more medical questions answered YES';

      await resend.emails.send({
        from: 'Castle School of Dancing <onboarding@resend.dev>',
        to: ['nickbinmoredancing@gmail.com'],
        subject: `New PAR-Q Form Submitted - ${formData.name}`,
        html: `
          <h2>New PAR-Q Form Submission</h2>
          <p><strong>Participant Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Age:</strong> ${formData.age}</p>
          <p><strong>Medical Status:</strong> ${medicalStatus}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-GB')}</p>
          <hr />
          <p>The completed PAR-Q form has been saved to Google Drive as: <strong>${fileName}</strong></p>
        `,
      });
    } catch (emailError) {
      // Log email error but don't fail the form submission
      console.error('Failed to send email notification:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'PAR-Q form submitted successfully',
      fileId: file.data.id,
      fileName: file.data.name,
    });

  } catch (error) {
    console.error('Error submitting PAR-Q form:', error);
    return NextResponse.json(
      {
        error: 'Failed to submit form',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
