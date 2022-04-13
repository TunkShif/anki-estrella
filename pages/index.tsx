import { useAtom } from "jotai"
import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import CardPanel from "../components/CardPanel"
import DictPanel from "../components/DictPanel"
import Layout from "../components/Layout"
import ConnectionAlert from "../components/Layout/ConnectionAlert"
import useConnect from "../hooks/useConnection"
import { connectedAtom } from "../store"

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
  const connect = useConnect()

  useEffect(() => {
    connect()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 250)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <Toaster position="top-right" toastOptions={{ className: "toast" }} />
      <Layout>{loading ? <div></div> : <Content />}</Layout>
    </>
  )
}

export default Home
