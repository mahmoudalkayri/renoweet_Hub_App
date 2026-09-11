# Renoweet Focus Hub v4.2

## Proof storage
- New receipt photos are resized/compressed before upload (target roughly a few hundred KB when practical).
- Proofs are stored separately in Google Drive under `Renoweet Data / Proofs / YEAR / Q#`.
- The yearly JSON stores only proof metadata/file references, so the live database stays small.
- PDFs are kept as their original file rather than destructively recompressed.
- Expenses view adds combined proof PDF export for the selected quarter and full year, including a completeness/index page.
- Existing legacy/local proof filenames remain readable when the old proof folder is still available.

## Invoice numbering
- Format remains `YYYY-DDMMNNN`.
- Sequence resets each quarter.
- The allocator uses the lowest available sequence in the quarter, so a deleted trailing invoice number can be reused and gaps caused by deletions are filled.
- Merely opening an OS invoice no longer consumes an invoice number. A number is assigned when the invoice is sent/marked sent/sent to bookkeeping or printed as a final PDF.
- Deleting an OS project creates a one-time bookkeeping cancellation marker. If that invoice had already been imported, Bookkeeping moves the matching active invoice to Deleted when Drive is refreshed.
- Restoring an OS project clears its old invoice number; the next send gets the currently available number.

## Upload note
Upload/overwrite the files in this package, but keep the existing `renoweet-drive-core-v3.0.js`, `renoweet-bookkeeping-drive-adapter-v3.7.js`, and `renoweet-os-drive-adapter-v3.6.js` already in the GitHub repository. v4.2 adds two enhancement JS files that load after those adapters.
