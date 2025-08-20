"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, CheckCircle2, Link as LinkIcon, Clipboard } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function IntegrityPage() {
  const [file, setFile] = useState<File | null>(null)
  const [hash, setHash] = useState<string>("")
  const [copied, setCopied] = useState<boolean>(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null
    setFile(selected)
    setHash("")
  }

  const computeHash = async () => {
    if (!file) return
    const buffer = await file.arrayBuffer()
    const digest = await crypto.subtle.digest("SHA-256", buffer)
    const hashArray = Array.from(new Uint8Array(digest))
    const hex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    setHash(hex)
  }

  const copyToClipboard = async () => {
    if (!hash) return
    await navigator.clipboard.writeText(hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation showAuthButtons={true} />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10 text-center space-y-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-700 text-sm">
            <Shield className="w-4 h-4 mr-2" /> Data integrity & proofs
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Prove your data hasn’t changed</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Generate a SHA‑256 fingerprint for any dataset. Anchor it on a public chain or your internal registry for
            audits and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Generate a dataset fingerprint</CardTitle>
              <CardDescription>We compute the hash locally in your browser. Your file never leaves your device.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Input type="file" onChange={handleFileChange} className="bg-white" />
                <Button onClick={computeHash} disabled={!file}>
                  Compute SHA‑256
                </Button>
              </div>
              {hash && (
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="text-xs uppercase text-slate-500 mb-1">Hash</div>
                  <div className="flex items-center justify-between gap-3">
                    <code className="text-slate-800 break-all text-sm">{hash}</code>
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      {copied ? <CheckCircle2 className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Anchor your proof</CardTitle>
              <CardDescription>
                Use any anchoring service to write this hash to a public blockchain (e.g., Bitcoin, Ethereum) or your
                company ledger. Store the resulting transaction URL next to your dataset.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-700">
              <ol className="list-decimal list-inside space-y-2">
                <li>Compute the SHA‑256 hash above.</li>
                <li>Submit the hash to your preferred anchoring service.</li>
                <li>Save the transaction URL alongside your dataset and share it with stakeholders.</li>
              </ol>
              <div className="text-sm text-slate-500">
                Tip: For private deployments, anchor to your internal registry and periodically checkpoint to a public
                chain.
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Verify a dataset</CardTitle>
              <CardDescription>Recompute the hash and compare with the stored value or on-chain record.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-slate-700">
              <div className="flex items-center gap-2 text-sm">
                <LinkIcon className="w-4 h-4" /> Paste a transaction URL in your notes for one‑click verification.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}


