import type { NextPage } from "next"
import Layout from "../components/Layout"
import CardPanel from "../components/CardPanel"
import DictPanel from "../components/DictPanel"

const Home: NextPage = () => {
  return (
      <Layout>
        <div className="grid grid-cols-2 gap-28">
          <DictPanel />
          <CardPanel />
        </div>
      </Layout>
  )
}

export default Home
