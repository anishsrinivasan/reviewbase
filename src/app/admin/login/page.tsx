"use client"
import React, { useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { toast } = useToast();



    const handleSignIn = async () => {
        const supabase = createClientComponentClient<Database>({});
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        console.log(data, error)
        if (error) {
            alert("Login Failed")
        }




        console.log('Signing in with email:', email, 'and password:', password);
    };



    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-[#FAFAFA] w-full max-w-md p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">
                    {'Sign In'}
                </h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold">
                        Email Address
                    </label>
                    <Input
                        type="email"
                        id="email"

                        placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold">
                        Password
                    </label>
                    <Input
                        type="password"
                        id="password"
                        className="w-full mt-1 p-2 border rounded-md"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    onClick={handleSignIn}
                >
                    {'Sign In'}
                </Button>
                -

            </div>
        </div>
    );
};

export default Signup;
