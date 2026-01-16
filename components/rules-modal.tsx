"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sport } from "./sports"

interface RulesModalProps {
  sport: Sport
  isOpen: boolean
  onClose: () => void
}

export default function RulesModal({ sport, isOpen, onClose }: RulesModalProps) {
  const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-cyan-500/30 bg-slate-900/95 backdrop-blur-sm max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{sport.icon}</span>
            <DialogTitle className="text-cyan-300">{sport.name} Rules</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">{sport.rules}</div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
          <Button onClick={onClose} className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold glow-cyan">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
