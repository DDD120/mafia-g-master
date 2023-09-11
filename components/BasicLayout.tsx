interface Props {
  headText: string
  children: React.ReactNode
}

function BasicLayout({ headText, children }: Props) {
  return (
    <section className="h-full flex flex-col p-4">
      <header>
        <h1 className="font-black text-2xl text-center">{headText}</h1>
      </header>
      <div className="mt-4 h-full overflow-hidden flex flex-col gap-4 justify-between">
        {children}
      </div>
    </section>
  )
}

export default BasicLayout
