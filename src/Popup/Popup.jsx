import React from 'react'
import AnalyticsIcon from '../icons/analytics.png'
import KeywordsIcon from '../icons/Keyword.png'
import IdeasIcon from '../icons/idea-11.png'
import PlaybacksIcon from '../icons/Playback.png'
import BookmarksIcon from '../icons/Bookmark.png'

const Popup = () => {

    const menuItems = [
  { name: 'Analytics', icon: AnalyticsIcon },
  { name: 'Keywords', icon: KeywordsIcon },
  { name: 'Ideas', icon: IdeasIcon },
  { name: 'Playbacks', icon: PlaybacksIcon },
  { name: 'Bookmarks', icon: BookmarksIcon },
];

  return (
   <div className="bg-white rounded-2xl shadow-lg p-4 w-[400px] h-[150px] overflow-auto">
      <div className="text-center">
        <h1 className="text-xl font-semibold bg-[#63aab2] text-white py-2 rounded-md">VideoOptimizer</h1>
      </div>
      <div className="flex justify-between bg-black text-white rounded-sm p-1">
        {menuItems.map((item) => (
          <div key={item.name} className="flex flex-col items-center space-y-1 cursor-pointer hover:text-blue-400 rounded-md">
            <img src={item.icon} alt={`${item.name} icon`}
             className="h-6 w-6 filter invert sepia hue-rotate-[140deg] saturate-300 transition duration-300 ease-in-out hover:scale-110 hover:brightness-125" />
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Popup
