import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Check if features are already selected
      const selectedFeatures = localStorage.getItem("selectedFeatures");
      navigate(selectedFeatures ? "/dashboard" : "/select-features");
    }
  }, [user, navigate]);

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Login successful",
        description: "Redirecting to your dashboard...",
      });
      // Check if features are selected
      const selectedFeatures = localStorage.getItem("selectedFeatures");
      navigate(selectedFeatures ? "/dashboard" : "/select-features");
    } catch (error: unknown) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid email or password",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold">SCM Portal Login</h1>
          <p className="text-muted-foreground mt-2">
            Access your supply chain management dashboard
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input 
              {...register("email")} 
              type="email" 
              placeholder="your@email.com"
              className={errors.email && "border-red-500"}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input 
              {...register("password")} 
              type="password" 
              placeholder="••••••••"
              className={errors.password && "border-red-500"}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                Remember me
              </label>
            </div>
            
            <button
              type="button"
              onClick={() => navigate("/reset-password")}
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              Forgot password?
            </button>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <button 
            onClick={() => navigate("/signup")} 
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}