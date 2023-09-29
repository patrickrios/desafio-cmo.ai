'use client'
import styles from './page.module.css'
import { Header } from './components/header/Header'
import { Dashboard } from './components/dashboard/Dashboard'
import { TopicsProvider } from '@/providers/TopicsContext'
import { YouTube } from './components/youtube/YouTube'
import { GoogleTrends } from './components/google-trends/GoogleTrends'
import { MenuProvider } from '@/providers/MenuContext'
import { HeaderSubContext } from './components/header/HeaderSubContent'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${styles.main} ${nunito.className}`}>
      <title>DESAFIO CMO.AI</title>
      <TopicsProvider>
        <MenuProvider>
            <Header/>
            <HeaderSubContext/>
            <Dashboard>
              <GoogleTrends/>
              <YouTube/>
            </Dashboard>
        </MenuProvider>
      </TopicsProvider>
    </main>
  )
}
