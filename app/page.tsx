import TodoList from '@/components/TodoList'
import WeatherModule from '@/components/WeatherModule'
import QuoteNotification from '@/components/QuoteNotification'
import Reminders from '@/components/Reminders'
import UserProfile from '@/components/UserProfile'
import NewsHeadlines from '@/components/NewsHeadlines'
import MusicRecommendations from '@/components/MusicRecommendations'

export default function Home() {
  return (
    <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Y.O.L.O Personal Assistant</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <UserProfile />
        <TodoList />
        <WeatherModule />
        <QuoteNotification />
        <Reminders />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NewsHeadlines />
        <MusicRecommendations />
      </div>
    </main>
  )
}

