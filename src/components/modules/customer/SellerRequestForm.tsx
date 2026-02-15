"use client";

import { useState, useTransition } from "react";
import { Home, Send } from "lucide-react";
import { toast } from "sonner";

import type { SaveResponse } from "@/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SellerRequestUser = {
  id: string;
  name?: string;
  email?: string;
};

type Props = {
  user: SellerRequestUser;
  onSubmit: (data: { address: string }) => Promise<SaveResponse>;
};

export function SellerRequestForm({ user, onSubmit }: Props) {
  const [address, setAddress] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!address.trim()) {
      toast.error("Address is required");
      return;
    }

    startTransition(async () => {
      try {
        const res = await onSubmit({ address: address.trim() });
        if (res.success) {
          toast.success(res.message || "Seller request submitted");
          setAddress("");
          return;
        }
        toast.error(res.message || "Failed to send seller request");
      } catch {
        toast.error("Failed to send seller request");
      }
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card className="overflow-hidden border-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white shadow-lg">
        <CardContent className="p-6">
          <p className="text-sm text-white/85">Grow with Health Mart</p>
          <h1 className="mt-1 text-2xl font-semibold md:text-3xl">
            Request Seller Access
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/90">
            Submit your address and our admin team will review your request.
            Once approved, seller features will be enabled for your account.
          </p>
        </CardContent>
      </Card>

      <Card className="border border-slate-200/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Seller Request Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={user.name ?? "N/A"} readOnly disabled />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user.email ?? "N/A"} readOnly disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address"
              className="min-h-28"
            />
            <p className="text-xs text-muted-foreground">
              Only address is sent to backend with this request.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleSubmit} disabled={isPending}>
              <Send className="mr-2 h-4 w-4" />
              {isPending ? "Sending..." : "Send Request"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setAddress("")}
              disabled={isPending}
            >
              <Home className="mr-2 h-4 w-4" />
              Clear Address
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

