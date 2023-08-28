interface Props {
  headText: string
  footer?: React.ReactNode
  children: React.ReactNode
}

function BasicLayout({ headText, footer, children }: Props) {
  return (
    <section className="h-full flex flex-col  justify-between p-4">
      <div>
        <header>
          <h1 className="font-black text-2xl text-center">{headText}</h1>
        </header>
        <div className="mt-4">{children}</div>
      </div>
      <footer className="w-full">{footer}</footer>
    </section>
  )
}

export default BasicLayout
