import type { NextPage } from "next"
import Layout from "../components/Layout"
import CardPanel from "../components/CardPanel"
import DictPanel from "../components/DictPanel"
import { useAtom } from "jotai"
import { connectedAtom, tryConnectAtom } from "../store"
import { useEffect, useState } from "react"
import ConnectionAlert from "../components/Layout/ConnectionAlert"

const Content = () => {
  const [connected] = useAtom(connectedAtom)

  return (
    <>
      {connected ? (
        <div className="grid grid-cols-2 gap-28">
          <DictPanel />
          <CardPanel />
        </div>
      ) : (
        <div className="hidden">
          <ConnectionAlert />
        </div>
      )}
    </>
  )
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true)

  const [, tryConnect] = useAtom(tryConnectAtom)

  useEffect(() => {
    tryConnect()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 250)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return <Layout>{loading ? <div></div> : <Content />}</Layout>
}

export default Home
