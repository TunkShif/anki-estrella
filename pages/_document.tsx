import { Head, Html, Main, NextScript } from "next/document"

const Document = () => {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&family=Outfit&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-slate-100 transition-all duration-300 dark:bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
