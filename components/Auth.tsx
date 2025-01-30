import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "./ui/badge";

export function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [hiddenPassword, setHiddenPassword] = useState(true);  
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const toggleVisibility = () => {
        setHiddenPassword(!hiddenPassword);
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(!emailRegex.test(email)){
            setError('Invalid email address');
            setLoading(false);
            return;
        }

        if(!passwordRegex.test(password)){
            setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            setLoading(false);
            return;
        }
    
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
                name,
            });

            if(result?.error){
                setError('Invalid email or password');
                setLoading(false);
                return;
            } else {
                window.location.reload();
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog>
        <DialogTrigger asChild >
            <Button className="w-full py-6 text-lg font-semibold">
             Login
            </Button>
        </DialogTrigger>
        <DialogContent className="text-white bg-black max-w-[400px]">
            <DialogHeader>
            <DialogTitle className="text-white">You are not logged in</DialogTitle>
            <DialogDescription>
                Log in to your account
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                Name
                </Label>
                <Input 
                    id="name" 
                    type="text"
                    autoComplete="text"
                    placeholder="Pedro Duarte"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3" />
            </div>

            {/* Email Field */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                Email
                </Label>
                <Input 
                    id="email" 
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="@peduarte" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="col-span-3" />
            </div>

            {/* Password Field */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                    Password
                </Label>
                <Input 
                    id="password" 
                    name="password"
                    type= {hiddenPassword ? "password" : "text"}
                    autoComplete="password"
                    required
                    placeholder="mypassword" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="col-span-3 pr-10" 
                />
                <div
                    onClick={toggleVisibility}
                    className="absolute right-8 top-3/2 cursor-pointer"
                >
                    {hiddenPassword ? <EyeOff/> : <Eye/> }
                </div>
            </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="text-red-500 text-sm text-center">
                    {error}
                </div>
            )}

            <DialogFooter>
            <Button type="submit"
                    disabled={loading}
                    className="w-full bg-[#4c9ce2]/80 hover:bg-[#4c9ce2]/60 py-6 text-lg font-semibold"
                    onClick={handleSubmit}
            >
                        {loading ? (
                            <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loging In...
                          </span>
                        ) : (
                            "Login" 
                        )}
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}