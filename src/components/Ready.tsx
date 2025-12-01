import React from "react";
import { Button } from "./ui/button";

const Ready = () => {
    return (
        <div>
            <section className="relative z-10 px-6 lg:px-12 py-32">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-6xl lg:text-7xl font-light mb-8 leading-tight">
                        ready when
                        <br />
                        <span className="italic font-serif">you are</span>
                    </h2>
                    <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                        no pressure. just a conversation to see if we're a good fit.
                    </p>
                    <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-12 h-16 text-lg">
                        Book Free Consultation
                    </Button>
                    <div className="mt-8 flex items-center justify-center gap-8 text-sm text-white/40">
                        <span>no commitment</span>
                        <span>•</span>
                        <span>100% confidential</span>
                        <span>•</span>
                        <span>insurance accepted</span>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Ready;