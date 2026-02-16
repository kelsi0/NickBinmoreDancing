import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { Readable } from 'stream';
import { Resend } from 'resend';

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

// Format form data as HTML for PDF
const formatFormDataAsHTML = (formData: any) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatSignature = (signature: string) => {
    if (!signature) return 'Not provided';
    if (signature.startsWith('data:image')) {
      return `<img src="${signature}" alt="Signature" style="max-height: 80px; border: 1px solid #ccc; padding: 5px;" />`;
    }
    return `<p style="font-style: italic; border: 1px solid #ccc; padding: 10px; background: #f9f9f9;">${signature}</p>`;
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PAR-Q Form - ${formData.name}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
    h1 { color: #9c2b8a; border-bottom: 3px solid #9c2b8a; padding-bottom: 10px; }
    h2 { color: #9c2b8a; margin-top: 30px; border-bottom: 2px solid #e0e0e0; padding-bottom: 5px; }
    .section { margin-bottom: 30px; page-break-inside: avoid; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .value { margin-left: 10px; }
    .question { background: #f5f5f5; padding: 10px; margin: 10px 0; border-left: 4px solid #9c2b8a; page-break-inside: avoid; }
    .answer { font-weight: bold; color: #9c2b8a; }
    .signature-block { border: 1px solid #ddd; padding: 15px; margin: 10px 0; background: #fafafa; page-break-inside: avoid; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #9c2b8a; font-size: 0.9em; color: #666; }
    @media print {
      body { margin: 20px; }
    }
  </style>
</head>
<body>
  <h1>Physical Activity Readiness Questionnaire (PAR-Q)</h1>
  <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-GB')}</p>

  <div class="section">
    <h2>Personal Information</h2>
    <div class="field"><span class="label">Name:</span><span class="value">${formData.name || 'N/A'}</span></div>
    <div class="field"><span class="label">Gender:</span><span class="value">${formData.gender || 'N/A'}</span></div>
    <div class="field"><span class="label">Email:</span><span class="value">${formData.email || 'N/A'}</span></div>
    <div class="field"><span class="label">Age:</span><span class="value">${formData.age || 'N/A'}</span></div>
    <div class="field"><span class="label">Contact Number:</span><span class="value">${formData.contactNumber || 'N/A'}</span></div>
    <div class="field"><span class="label">Next of Kin's Name:</span><span class="value">${formData.nextOfKinName || 'N/A'}</span></div>
    <div class="field"><span class="label">Emergency Contact Number:</span><span class="value">${formData.emergencyContactNumber || 'N/A'}</span></div>
  </div>

  <div class="section">
    <h2>Health Screening Questions</h2>
    <div class="question">
      <p><strong>1. Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?</strong></p>
      <p class="answer">Answer: ${formData.question1?.toUpperCase() || 'NOT ANSWERED'}</p>
    </div>
    <div class="question">
      <p><strong>2. Do you feel pain in your chest when you do physical activity?</strong></p>
      <p class="answer">Answer: ${formData.question2?.toUpperCase() || 'NOT ANSWERED'}</p>
    </div>
    <div class="question">
      <p><strong>3. In the past month, have you had chest pain when you were not doing physical activity?</strong></p>
      <p class="answer">Answer: ${formData.question3?.toUpperCase() || 'NOT ANSWERED'}</p>
    </div>
    <div class="question">
      <p><strong>4. Do you lose your balance because of dizziness or do you ever lose consciousness?</strong></p>
      <p class="answer">Answer: ${formData.question4?.toUpperCase() || 'NOT ANSWERED'}</p>
    </div>
    <div class="question">
      <p><strong>5. Do you have a bone or joint problem (for example, back, knee or hip) that could be made worse by a change in physical activity?</strong></p>
      <p class="answer">Answer: ${formData.question5?.toUpperCase() || 'NOT ANSWERED'}</p>
    </div>
    <div class="question">
      <p><strong>6. Is your doctor currently prescribing drugs (for example, water pills) for your blood pressure or heart condition?</strong></p>
      <p class="answer">Answer: ${formData.question6?.toUpperCase() || 'NOT ANSWERED'}</p>
    </div>
    <div class="question">
      <p><strong>7. Do you know of any other reason why you should not do physical activity?</strong></p>
      <p class="answer">Answer: ${formData.question7?.toUpperCase() || 'NOT ANSWERED'}</p>
    </div>
  </div>

  <div class="section">
    <h2>Participant Declaration</h2>
    
    <div class="signature-block">
      <h3>Client's Signature</h3>
      ${formatSignature(formData.clientSignature)}
      <p><strong>Date:</strong> ${formatDate(formData.clientSignatureDate)}</p>
    </div>

    <div class="signature-block">
      <h3>Witness's Signature</h3>
      ${formatSignature(formData.witnessSignature)}
      <p><strong>Date:</strong> ${formatDate(formData.witnessSignatureDate)}</p>
    </div>

    <div style="background: #f9f9f9; padding: 15px; margin: 20px 0; border: 1px solid #ddd; border-radius: 5px;">
      <p style="font-size: 11px; font-style: italic; margin: 0 0 10px 0;">
        Please note that no liability is accepted for any loss of or damage to any articles, which you may bring with you to classes. Equally, liability is not accepted for loss of or damage to motor vehicles or their contents and these are left at the owner's risk.
      </p>
    </div>

    <div style="background: #f9f9f9; padding: 15px; margin: 20px 0; border: 1px solid #ddd; border-radius: 5px;">
      <p style="font-size: 13px; margin: 0;">
        "I confirm that where any medical condition, discomfort or injury which may be affected by physical activity applies or becomes applicable at any time when I am participating in a class, I am responsible for checking with my doctor to ensure I am able to participate in this activity."
      </p>
    </div>

    <div style="background: #e3f2fd; padding: 20px; margin: 20px 0; border: 2px solid #2196F3; border-radius: 5px;">
      <h3 style="color: #1565C0; margin: 0 0 10px 0; font-size: 16px;">Data Protection & Privacy (GDPR Consent)</h3>
      <p style="font-size: 13px; color: #1565C0; margin: 0 0 10px 0;">
        By submitting this form, the participant consents to Nick Binmore Dancing storing and processing their personal information in accordance with UK GDPR regulations. The data will be kept securely and used solely for the purpose of managing participation in dance classes and ensuring health and safety. The participant has the right to access, rectify, or request deletion of their personal data at any time.
      </p>
      <p style="font-size: 13px; color: #1565C0; margin: 0;">
        For more information about how we handle data, please refer to our Privacy Policy at <strong>nickbinmoredancing.co.uk/privacy</strong> or contact us directly.
      </p>
    </div>

    <div class="field"><span class="label">Full Name:</span><span class="value">${formData.printName || 'N/A'}</span></div>
    <div class="field"><span class="label">Address:</span><span class="value">${formData.address?.replace(/\n/g, '<br>') || 'N/A'}</span></div>
    <div class="field"><span class="label">Post Code:</span><span class="value">${formData.postCode || 'N/A'}</span></div>
    <div class="field"><span class="label">Date:</span><span class="value">${formatDate(formData.declarationDate)}</span></div>
  </div>

  <div class="footer">
    <p><strong>Nick Binmore Dancing</strong></p>
    <p>IDTA Qualified Ballroom and Latin Dance Instructor</p>
    <p>This document contains sensitive personal information and should be stored securely.</p>
  </div>
</body>
</html>
  `;
};

export async function POST(request: Request) {
  let browser;

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

    // Generate HTML content
    const htmlContent = formatFormDataAsHTML(formData);

    // Convert HTML to PDF using Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    });

    await browser.close();
    browser = null;

    // Create file metadata
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `PARQ_${formData.name.replace(/\s+/g, '_')}_${timestamp}.pdf`;

    // Convert PDF buffer to proper Buffer and then to stream for Google Drive upload
    const buffer = Buffer.from(pdfBuffer);
    const pdfStream = Readable.from([buffer]);

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
    if (browser) {
      await browser.close();
    }

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
