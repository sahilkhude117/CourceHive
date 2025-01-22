import { Button } from "@/components/ui/button"
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
import { AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { AlertDialogFooter } from "./ui/alert-dialog";

export function EditProfile() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if(!name){
      setError('Name is required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      } else {
        setIsOpen(false);
        alert('Profile updated successfully');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
}

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild >
        <Button 
          className="w-full bg-[#4c9ce2]/80 hover:bg-[#4c9ce2]/60 py-6 text-lg font-semibold"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="text-white bg-black max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-white">Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
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
                  className="bg-[#4c9ce2]/80 hover:bg-[#4c9ce2]/60"
                  onClick={handleSubmit}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
