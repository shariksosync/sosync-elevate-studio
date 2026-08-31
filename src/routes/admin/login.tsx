import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADMIN_SESSION_KEY } from "@/components/SiteProvider";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Staff Login | SOSync AI Tech" },
      { name: "description", content: "Internal staff access to the SOSync AI Tech management console." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Staff Login | SOSync AI Tech" },
      { property: "og:description", content: "Internal staff access to the SOSync AI Tech management console." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@sosyncaitech.in");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Enter your staff email and password.");
      return;
    }
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ email, at: Date.now() }));
    toast.success("Welcome back.");
    navigate({ to: "/admin/dashboard" });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-24">
      <div className="rounded-xl border border-border bg-card p-8">
        <Lock className="h-6 w-6 text-primary" />
        <h1 className="mt-4 text-2xl font-bold">Staff Access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Demo console — sign in with any password to explore the management modules.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ad-email">Email</Label>
            <Input id="ad-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ad-pass">Password</Label>
            <Input id="ad-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
        <Link to="/" className="mt-6 block text-center text-xs text-muted-foreground hover:text-primary">
          Back to website
        </Link>
      </div>
    </div>
  );
}
