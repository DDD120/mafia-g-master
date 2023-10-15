interface Props {
  children: React.ReactNode
}

function MainContentLayout({ children }: Props) {
  return (
    <div className="scrollbar-hide overflow-y-auto sm:scrollbar-default sm:pr-2">
      {children}
    </div>
  )
}

export default MainContentLayout
