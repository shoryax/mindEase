"use client";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto mb-8 relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search activities..."
        value={value}
        onChange={onChange}
        className="pl-11 pr-4 py-3 bg-black/5 dark:bg-white/5 backdrop-blur-sm border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-ring transition-all duration-300"
      />
    </div>
  );
}
