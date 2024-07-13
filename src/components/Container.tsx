import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-6xl flex flex-col mx-auto min-h-screen bg-white">
            {children}
        </div>
    );
};

export default Container;
