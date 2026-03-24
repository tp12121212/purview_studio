import { cn } from '@/lib/cn'

interface CodeBlockProps {
  children: string
  className?: string
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const lines = children.split('\n')
  return (
    <div
      className={cn(
        'bg-bg-primary border border-border-default rounded-[6px] overflow-hidden',
        className
      )}
    >
      <div className="overflow-x-auto">
        <pre className="p-4 text-[13px] leading-5 font-mono [font-variant-ligatures:none]">
          <table className="border-collapse">
            <tbody>
              {lines.map((line, i) => (
                <tr key={i}>
                  <td className="pr-4 text-right text-text-muted select-none align-top w-8">
                    {i + 1}
                  </td>
                  <td className="whitespace-pre text-text-primary">{line}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </pre>
      </div>
    </div>
  )
}
