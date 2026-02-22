"use client";
import React, { useState, useRef, useCallback } from "react";
import { Camera, Upload, Loader2, AlertCircle, Stethoscope, RotateCcw, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "../../contexts/UserContext";
import Header from "../../components/Header";
import NotLoggedIn from "../../components/NotLoggedIn";

interface MedicineResult {
  name: string;
  type: string;
  commonUses: string[];
  dosageInfo: string;
  sideEffects: string[];
  warnings: string[];
  activeIngredients: string[];
  storageInfo: string;
  disclaimer: string;
  error?: string;
}

export default function AIDoctorPage() {
  const { user, loading } = useUser();
  const [mode, setMode] = useState<"upload" | "camera">("upload");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [result, setResult] = useState<MedicineResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [cameraActive, setCameraActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch {
      setError("Camera access denied. Please allow camera permissions or use file upload.");
    }
  };

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraActive(false);
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setImagePreview(dataUrl);
    setImageBase64(dataUrl.split(",")[1]);
    stopCamera();
    setResult(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setImagePreview(dataUrl);
      setImageBase64(dataUrl.split(",")[1]);
      setResult(null);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    if (!imageBase64) return;
    setAnalyzing(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/ai-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setImagePreview(null);
    setImageBase64(null);
    setResult(null);
    setError("");
    stopCamera();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <NotLoggedIn message="Sign in to use AI Doctor." />;
  }

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium">
            <Stethoscope className="h-4 w-4" />
            AI Doctor — Medicine Analyzer
          </div>
          <h1 className="text-4xl font-light text-foreground mb-2">
            Identify any{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">medicine instantly</span>
          </h1>
          <p className="text-muted-foreground text-lg font-light max-w-xl mx-auto">
            Point your camera at any medicine packaging. AI will explain what it is, how it works, and what to watch out for.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Camera / Upload */}
          <div className="space-y-4">
            {/* Mode toggle */}
            <div className="flex gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-full w-fit">
              {(["upload", "camera"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); reset(); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                    mode === m
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "camera" ? <Camera className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
                  {m === "upload" ? "Upload Photo" : "Use Camera"}
                </button>
              ))}
            </div>

            {/* Camera / Upload area */}
            <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-background/50 aspect-video flex items-center justify-center">
              {mode === "camera" ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${cameraActive && !imagePreview ? "block" : "hidden"}`}
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  {imagePreview && (
                    <img src={imagePreview} alt="Captured" className="w-full h-full object-contain" />
                  )}

                  {!cameraActive && !imagePreview && (
                    <div className="text-center p-8">
                      <Camera className="h-14 w-14 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm mb-4">Camera is off</p>
                      <Button onClick={startCamera} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full px-6">
                        Start Camera
                      </Button>
                    </div>
                  )}

                  {cameraActive && !imagePreview && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                      <button
                        onClick={capturePhoto}
                        className="w-14 h-14 rounded-full bg-white shadow-xl border-4 border-blue-500 hover:scale-105 transition-transform"
                      />
                      <button
                        onClick={stopCamera}
                        className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Uploaded" className="w-full h-full object-contain" />
                  ) : (
                    <div
                      className="text-center p-8 cursor-pointer w-full h-full flex flex-col items-center justify-center hover:bg-blue-500/5 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                        <Upload className="h-7 w-7 text-blue-500" />
                      </div>
                      <p className="text-foreground font-medium mb-1">Drop an image or click to upload</p>
                      <p className="text-muted-foreground text-sm">JPG, PNG, WEBP supported</p>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              {imagePreview && (
                <>
                  <Button
                    onClick={analyze}
                    disabled={analyzing}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl py-3 font-medium"
                  >
                    {analyzing ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing medicine...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4" />
                        Analyze Medicine
                      </span>
                    )}
                  </Button>
                  <Button variant="outline" onClick={reset} className="rounded-xl px-4">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {error && (
              <div className="flex items-start gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}
          </div>

          {/* Right: Results */}
          <div className="p-6 rounded-2xl border border-border/50 bg-background/50">
            <h2 className="text-base font-medium text-foreground mb-4 flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-blue-500" />
              Medicine Information
            </h2>

            {result ? (
              <div className="space-y-5 overflow-y-auto max-h-[560px] pr-1">
                {/* Name & Type */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{result.name}</h3>
                  <span className="inline-block mt-1 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium capitalize">
                    {result.type}
                  </span>
                </div>

                {/* Common Uses */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Common Uses</p>
                  <ul className="space-y-1">
                    {result.commonUses.map((u) => (
                      <li key={u} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-blue-500 mt-0.5">•</span>{u}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dosage */}
                {result.dosageInfo && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Dosage Info</p>
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <p className="text-sm text-foreground">{result.dosageInfo}</p>
                    </div>
                  </div>
                )}

                {/* Active Ingredients */}
                {result.activeIngredients?.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Active Ingredients</p>
                    <div className="flex flex-wrap gap-2">
                      {result.activeIngredients.map((i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">{i}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Side Effects */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Side Effects</p>
                  <div className="flex flex-wrap gap-2">
                    {result.sideEffects.map((s) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Warnings */}
                {result.warnings?.length > 0 && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p className="text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      Warnings
                    </p>
                    <ul className="space-y-1">
                      {result.warnings.map((w) => (
                        <li key={w} className="text-sm text-red-700 dark:text-red-300 flex items-start gap-2">
                          <span className="mt-0.5">⚠</span>{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Storage */}
                {result.storageInfo && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Storage</p>
                    <p className="text-sm text-muted-foreground">{result.storageInfo}</p>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-border/50">
                  <p className="text-xs text-muted-foreground">{result.disclaimer}</p>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-center">
                <div>
                  <Stethoscope className="h-12 w-12 text-blue-400/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">Capture or upload a medicine image to get started.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
