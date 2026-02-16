"use client";

import { useState, useRef, useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// SignaturePad Component
interface SignaturePadProps {
  value: string;
  onChange: (signature: string) => void;
  label: string;
  required?: boolean;
}

function SignaturePad({
  value,
  onChange,
  label,
  required = false,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [mode, setMode] = useState<"type" | "draw">("type");
  const [typedSignature, setTypedSignature] = useState("");
  const [canvasHeight, setCanvasHeight] = useState(160);
  const [lineWidth, setLineWidth] = useState(1.5);

  // Detect device type and set canvas height + line width
  useEffect(() => {
    const updateDeviceSettings = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile
        setCanvasHeight(120);
        setLineWidth(2.5);
      } else if (width < 1024) {
        // Tablet
        setCanvasHeight(140);
        setLineWidth(2);
      } else {
        // Desktop
        setCanvasHeight(160);
        setLineWidth(1.5);
      }
    };

    updateDeviceSettings();
    window.addEventListener("resize", updateDeviceSettings);
    return () => window.removeEventListener("resize", updateDeviceSettings);
  }, []);

  useEffect(() => {
    if (mode !== "draw") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size based on container
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Configure drawing style
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Load existing signature if present and is base64
    if (value && value.startsWith("data:image")) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        setIsEmpty(false);
      };
      img.src = value;
    }
  }, [mode, value, lineWidth]);

  const startDrawing = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (x: number, y: number) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
    setIsEmpty(false);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(false);

    // Save signature as base64
    const dataUrl = canvas.toDataURL("image/png");
    onChange(dataUrl);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    startDrawing(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    draw(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseUp = () => {
    stopDrawing();
  };

  const handleMouseLeave = () => {
    stopDrawing();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    draw(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    stopDrawing();
  };

  const handleClear = () => {
    if (mode === "draw") {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      setIsEmpty(true);
    } else {
      setTypedSignature("");
    }
    onChange("");
  };

  const handleModeChange = (newMode: "type" | "draw") => {
    setMode(newMode);
    onChange("");
    setTypedSignature("");
    setIsEmpty(true);
  };

  const handleTypedSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTypedSignature(newValue);
    onChange(newValue);
    setIsEmpty(newValue === "");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium">
          {label} {required && <span className="text-primary">*</span>}
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleModeChange("type")}
            className={`text-xs px-3 py-1 rounded-md transition-colors ${
              mode === "type"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Type
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("draw")}
            className={`text-xs px-3 py-1 rounded-md transition-colors ${
              mode === "draw"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Draw
          </button>
        </div>
      </div>

      {mode === "type" ? (
        <input
          type="text"
          value={typedSignature}
          onChange={handleTypedSignatureChange}
          required={required}
          placeholder="Type your full name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
        />
      ) : (
        <div className="relative border-2 border-gray-300 rounded-lg bg-white">
          <canvas
            ref={canvasRef}
            style={{ height: `${canvasHeight}px` }}
            className="w-full touch-none cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          {isEmpty && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-gray-400 text-sm">Sign here</span>
            </div>
          )}
        </div>
      )}

      {value && (
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-1">Preview:</p>
          {value.startsWith("data:image") ? (
            <img
              src={value}
              alt="Signature preview"
              className="border border-gray-200 rounded p-2 max-h-20 bg-white"
            />
          ) : (
            <div className="border border-gray-200 rounded p-2 bg-gray-50 text-sm italic">
              {value}
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={handleClear}
        disabled={isEmpty && typedSignature === ""}
        className="text-sm text-primary hover:text-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Clear signature
      </button>
    </div>
  );
}

interface FormData {
  // Personal Information
  name: string;
  gender: string;
  email: string;
  age: string;
  contactNumber: string;
  nextOfKinName: string;
  emergencyContactNumber: string;

  // Health Questions
  question1: string; // heart condition
  question2: string; // chest pain during activity
  question3: string; // chest pain when not active
  question4: string; // balance/dizziness
  question5: string; // bone/joint problem
  question6: string; // medication
  question7: string; // other reason

  // Declaration
  clientSignature: string;
  clientSignatureDate: string;
  witnessSignature: string;
  witnessSignatureDate: string;
  parentGuardianSignature: string;
  parentGuardianSignatureDate: string;
  signed: string;
  printName: string;
  address: string;
  postCode: string;
  declarationDate: string;
}

export default function ParqPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "",
    email: "",
    age: "",
    contactNumber: "",
    nextOfKinName: "",
    emergencyContactNumber: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    clientSignature: "",
    clientSignatureDate: "",
    witnessSignature: "",
    witnessSignatureDate: "",
    parentGuardianSignature: "",
    parentGuardianSignatureDate: "",
    signed: "",
    printName: "",
    address: "",
    postCode: "",
    declarationDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const hasAnyYes = () => {
    return [
      formData.question1,
      formData.question2,
      formData.question3,
      formData.question4,
      formData.question5,
      formData.question6,
      formData.question7,
    ].some((answer) => answer === "yes");
  };

  const allAnswered = () => {
    return [
      formData.question1,
      formData.question2,
      formData.question3,
      formData.question4,
      formData.question5,
      formData.question6,
      formData.question7,
    ].every((answer) => answer !== "");
  };

  const allQuestionsNo = () => {
    return [
      formData.question1,
      formData.question2,
      formData.question3,
      formData.question4,
      formData.question5,
      formData.question6,
      formData.question7,
    ].every((answer) => answer === "no");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Submit to Google Drive API
      const response = await fetch('/api/parq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to submit form');
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your PAR-Q form has been submitted successfully.",
      });

      // Reset form
      setFormData({
        name: "",
        gender: "",
        email: "",
        age: "",
        contactNumber: "",
        nextOfKinName: "",
        emergencyContactNumber: "",
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        question6: "",
        question7: "",
        clientSignature: "",
        clientSignatureDate: "",
        witnessSignature: "",
        witnessSignatureDate: "",
        parentGuardianSignature: "",
        parentGuardianSignatureDate: "",
        signed: "",
        printName: "",
        address: "",
        postCode: "",
        declarationDate: "",
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="font-sans">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-light text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Physical Activity Readiness Questionnaire (PAR-Q)
            </h1>
            <p className="text-lg md:text-xl text-black/90 max-w-3xl mx-auto">
              This PAR-Q is designed to help you help yourself. Completion of
              this form is a sensible first step if you are planning to increase
              the amount of physical activity in your life.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="section-container bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium mb-2">
                      Gender <span className="text-primary">*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium mb-2">
                      Age <span className="text-primary">*</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="1"
                      max="120"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Your age"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium mb-2">
                      Contact number <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="nextOfKinName" className="block text-sm font-medium mb-2">
                      Next of kin's name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="nextOfKinName"
                      name="nextOfKinName"
                      value={formData.nextOfKinName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Next of kin"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="emergencyContactNumber"
                      className="block text-sm font-medium mb-2"
                    >
                      Emergency Contact number <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      id="emergencyContactNumber"
                      name="emergencyContactNumber"
                      value={formData.emergencyContactNumber}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder="Emergency contact phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Introduction Text */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                <p className="text-sm leading-relaxed">
                  This PAR-Q is designed to help you to help yourself. Many benefits
                  are associated with regular exercise, and completion of the PAR-Q
                  form is a sensible first step to take if you are planning to
                  increase the amount of physical activity in your life.
                </p>
                <p className="text-sm leading-relaxed">
                  For most people, physical activity should not pose a problem or
                  hazard. The PAR-Q has been designed to identify the small number of
                  people for whom physical activity might be inappropriate or for
                  those who should seek medical advice concerning the type of activity
                  most suitable for them. Common sense is your best guide for
                  answering these questions.
                </p>
              </div>

              {/* Health Questions */}
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Health Screening Questions</h2>
                <div className="space-y-6">
                  {/* Question 1 */}
                  <div className="border-b border-gray-200 pb-6">
                    <p className="text-sm font-medium mb-3">
                      1. Has your doctor ever said that you have a heart condition and
                      that you should only do physical activity recommended by a
                      doctor? <span className="text-primary">*</span>
                    </p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="question1"
                          value="yes"
                          checked={formData.question1 === "yes"}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">YES</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="question1"
                          value="no"
                          checked={formData.question1 === "no"}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">NO</span>
                      </label>
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="border-b border-gray-200 pb-6">
                    <p className="text-sm font-medium mb-3">
                      2. Do you feel pain in your chest when you do physical activity?{" "}
                      <span className="text-primary">*</span>
                    </p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="question2"
                          value="yes"
                          checked={formData.question2 === "yes"}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">YES</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="question2"
                          value="no"
                          checked={formData.question2 === "no"}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">NO</span>
                      </label>
                    </div>
                  </div>

                  {/* Question 3 */}
                  <div className="border-b border-gray-200 pb-6">
                    <p className="text-sm font-medium mb-3">
                      3. In the past month, have you had chest pain when you were not
                      doing physical activity? <span className="text-primary">*</span>
                    </p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="question3"
                          value="yes"
                          checked={formData.question3 === "yes"}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">YES</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="question3"
                          value="no"
                          checked={formData.question3 === "no"}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">NO</span>
                      </label>
                    </div>
                  </div>

                  {/* Question 4 */}
                  <div className="border-b border-gray-200 pb-6">
                    <p className="text-sm font-medium mb-3">
                      4. Do you lose your balance because of dizziness or do you ever
                      lose consciousness? <span className="text-primary">*</span>
                    </p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="question4"
                          value="yes"
                          checked={formData.question4 === "yes"}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">YES</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="question4"
                          value="no"
                          checked={formData.question4 === "no"}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">NO</span>
                      </label>
                    </div>
                  </div>

                  {/* Question 5 */}
                  <div className="border-b border-gray-200 pb-6">
                    <p className="text-sm font-medium mb-3">
                      5. Do you have a bone or joint problem (for example, back, knee
                      or hip) that could be made worse by a change in physical
                      activity? <span className="text-primary">*</span>
                    </p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="question5"
                          value="yes"
                          checked={formData.question5 === "yes"}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">YES</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="question5"
                          value="no"
                          checked={formData.question5 === "no"}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">NO</span>
                      </label>
                    </div>
                  </div>

                  {/* Question 6 */}
                  <div className="border-b border-gray-200 pb-6">
                    <p className="text-sm font-medium mb-3">
                      6. Is your doctor currently prescribing drugs (for example, water
                      pills) for your blood pressure or heart condition?{" "}
                      <span className="text-primary">*</span>
                    </p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="question6"
                          value="yes"
                          checked={formData.question6 === "yes"}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">YES</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="question6"
                          value="no"
                          checked={formData.question6 === "no"}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">NO</span>
                      </label>
                    </div>
                  </div>

                  {/* Question 7 */}
                  <div>
                    <p className="text-sm font-medium mb-3">
                      7. Do you know of any other reason why you should not do physical
                      activity? <span className="text-primary">*</span>
                    </p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="question7"
                          value="yes"
                          checked={formData.question7 === "yes"}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">YES</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="question7"
                          value="no"
                          checked={formData.question7 === "no"}
                          onChange={handleChange}
                          required
                          className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">NO</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conditional Guidance Sections */}
              {allAnswered() && (
                <>
                  {/* STOP - If YES to any question */}
                  {hasAnyYes() && (
                    <div className="border-2 border-red-500 rounded-lg p-6 bg-red-50">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">STOP</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-red-900">
                            If you have answered YES to any of the above questions, then
                            you are required to gain consent from your doctor before
                            participating in the group exercise to music session.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Delay Warning - Always visible */}
                  <div className="border-2 border-yellow-500 rounded-lg p-6 bg-yellow-50">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-2xl">⚠️</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-yellow-900">
                          Delay becoming more active if:
                        </p>
                        <ul className="space-y-2 text-sm text-yellow-900">
                          <li className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">■</span>
                            <span>
                              You have a temporary illness such as a cold or fever; it
                              is best to wait until you feel better.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">■</span>
                            <span>
                              You are pregnant - talk to your health care practitioner,
                              your physician, a qualified exercise professional, before
                              becoming more physically active.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">■</span>
                            <span>
                              Your health changes - talk to your doctor or qualified
                              exercise professional before continuing with any physical
                              activity program.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Green Check - If all NO */}
                  {allQuestionsNo() && (
                    <div className="border-2 border-green-500 rounded-lg p-6 bg-green-50">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-3xl">✓</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-green-900">
                            If you have answered NO to all the above questions and you
                            have reasonable assurance of your suitability for exercise,{" "}
                            <strong>sign the participant declaration below</strong>.
                          </p>
                          <ul className="space-y-2 text-sm text-green-900">
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold">■</span>
                              <span>
                                It is advised that you consult a qualified exercise
                                professional to help you develop a safe and effective
                                physical activity plan to meet your health needs.
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold">■</span>
                              <span>
                                You are encouraged to start slowly and build up gradually
                                - 20 to 60 minutes of low to moderate intensity exercise,
                                3-5 days per week including aerobic and muscle
                                strengthening exercises.
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 font-bold">■</span>
                              <span>
                                If you are over the age of 45 years and NOT accustomed to
                                regular vigorous to maximal effort exercise, consult a
                                qualified exercise professional before engaging in this
                                intensity of exercise.
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Participant Declaration */}
              <div className="card">
                <h2 className="text-2xl font-bold mb-4">Participant Declaration</h2>
                <p className="text-sm mb-6 leading-relaxed">
                  Please read and sign the declaration below to confirm your understanding and consent.
                </p>

                <div className="space-y-6">
                  {/* Signature Table */}
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-300">
                      <div className="p-4 border-b md:border-b-0 md:border-r border-gray-300">
                        <SignaturePad
                          label="Client's signature"
                          value={formData.clientSignature}
                          onChange={(sig) =>
                            setFormData((prev) => ({ ...prev, clientSignature: sig }))
                          }
                          required
                        />
                      </div>
                      <div className="p-4">
                        <label className="block text-sm font-medium mb-2">
                          Date <span className="text-primary">*</span>
                        </label>
                        <input
                          type="date"
                          name="clientSignatureDate"
                          value={formData.clientSignatureDate}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-4 border-b md:border-b-0 md:border-r border-gray-300">
                        <SignaturePad
                          label="Witness's signature"
                          value={formData.witnessSignature}
                          onChange={(sig) =>
                            setFormData((prev) => ({ ...prev, witnessSignature: sig }))
                          }
                        />
                      </div>
                      <div className="p-4">
                        <label className="block text-sm font-medium mb-2">Date</label>
                        <input
                          type="date"
                          name="witnessSignatureDate"
                          value={formData.witnessSignatureDate}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Liability Statement */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-xs italic text-gray-700 leading-relaxed">
                      Please note that no liability is accepted for any loss of or
                      damage to any articles, which you may bring with you to classes.
                      Equally, liability is not accepted for loss of or damage to motor
                      vehicles or their contents and these are left at the owner's
                      risk.
                    </p>
                  </div>

                  {/* Medical Confirmation */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm leading-relaxed">
                      "I confirm that where any medical condition, discomfort or injury
                      which may be affected by physical activity applies or becomes
                      applicable at any time when I am participating in a class, I am
                      responsible for checking with my doctor to ensure I am able to
                      participate in this activity."
                    </p>
                  </div>

                  {/* GDPR Consent */}
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Data Protection & Privacy</h3>
                    <p className="text-sm text-blue-900 leading-relaxed mb-4">
                      By submitting this form, you consent to Nick Binmore Dancing storing and processing your personal information in accordance with UK GDPR regulations. Your data will be kept securely and used solely for the purpose of managing your participation in our dance classes and ensuring your health and safety. You have the right to access, rectify, or request deletion of your personal data at any time.
                    </p>
                    <p className="text-sm text-blue-900 leading-relaxed">
                      For more information about how we handle your data, please refer to our{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        className="text-primary font-semibold hover:text-primary-light underline transition-colors"
                      >
                        Privacy Policy
                      </a>
                      {" "}or contact us directly.
                    </p>
                  </div>

                  {/* Final Declaration Fields */}
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="printName"
                        className="block text-sm font-medium mb-2"
                      >
                        Print Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="printName"
                        name="printName"
                        value={formData.printName}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-2">
                        Address <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="Your full address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-vertical"
                      />
                    </div>

                    <div>
                      <label htmlFor="postCode" className="block text-sm font-medium mb-2">
                        Post Code <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="postCode"
                        name="postCode"
                        value={formData.postCode}
                        onChange={handleChange}
                        required
                        placeholder="Your post code"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="declarationDate"
                        className="block text-sm font-medium mb-2"
                      >
                        Date <span className="text-primary">*</span>
                      </label>
                      <input
                        type="date"
                        id="declarationDate"
                        name="declarationDate"
                        value={formData.declarationDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit PAR-Q Form"}
                </button>
              </div>

              {/* Status Message */}
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-lg text-center ${
                    submitStatus.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer
        leftText="© 2025 Nick Binmore Dancing"
        rightText="IDTA Qualified Instructor"
      />
    </>
  );
}
