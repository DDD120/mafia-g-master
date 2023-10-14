interface Props {
  headText: string
  children: React.ReactNode
}

function BasicLayout({ headText, children }: Props) {
  return (
    <section className="flex-1 h-full flex flex-col p-4 max-w-[600px] sm:max-h-[600px]">
      <header>
        <h1 className="font-black text-2xl text-center">{headText}</h1>
      </header>
      <main className="mt-4 h-full overflow-hidden flex flex-col gap-4 justify-between">
        {children}
      </main>
    </section>
  )
}

export default BasicLayout
