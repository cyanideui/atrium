import { useState } from "react"
import { FileUpload, Label } from "@atrium/ui"
import { PageHeader, Section, Demo } from "../../components/page-shell"

export function FileUploadPage() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="ds-prose">
      <PageHeader
        eyebrow="Component"
        title="File Upload"
        status="stable"
        description="Dashed dropzone with click-to-browse and drag-and-drop. File list rendered below."
      />

      <Section title="Default (single file)">
        <Demo
          code={`<FileUpload value={files} onChange={setFiles} accept=".csv,.xlsx" hint="CSV or XLSX up to 10MB" maxSize={10*1024*1024} />`}
        >
          <FileUpload
            value={files}
            onChange={setFiles}
            accept=".csv,.xlsx"
            hint="CSV or XLSX up to 10MB"
            maxSize={10 * 1024 * 1024}
          />
        </Demo>
      </Section>

      <Section title="Multiple files">
        <Demo code={`<FileUpload multiple accept="image/*" hint="PNG, JPG, GIF" />`}>
          <FileUpload multiple accept="image/*" hint="PNG, JPG, GIF" />
        </Demo>
      </Section>

      <Section title="With label">
        <Demo
          code={`<Label>Supporting documents</Label>
<FileUpload multiple />`}
        >
          <div className="w-full space-y-1.5">
            <Label>Supporting documents</Label>
            <FileUpload multiple />
          </div>
        </Demo>
      </Section>

      <Section title="Disabled">
        <Demo code={`<FileUpload disabled />`}>
          <FileUpload disabled />
        </Demo>
      </Section>
    </div>
  )
}
