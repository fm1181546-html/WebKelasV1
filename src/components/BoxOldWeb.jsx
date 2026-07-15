const BoxSpotify = () => {
    return (
        <div id="BoxSpotify" className="w-full bg-[#ffffff2d] rounded-[24px] p-5 flex flex-col justify-between aspect-square">
            <a 
                href="https://open.spotify.com/playlist/610nxlD8mUIQ8fc2palbkf?si=b18a63159257404e" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col justify-between h-full w-full">
                {/*Ikon Spotify & Panah*/}
                <div className="flex justify-between items-center w-full">
                    
                    {/* SVG Ikon Spotify Putih  */}
                    <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.075-.336.135-.668.47-.743 3.856-.88 7.15-.51 9.822 1.13.296.178.387.563.206.858zm1.225-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.673-1.114 8.243-.57 11.35 1.343.366.226.486.706.26 1.072zm.105-2.833C14.383 8.8 8.44 8.604 5.005 9.647c-.534.16-1.097-.142-1.26-.676-.16-.533.143-1.1.677-1.26 3.926-1.192 10.494-.967 14.617 1.48.48.285.64.903.353 1.384-.285.48-.904.64-1.385.353z"/>
                    </svg>
                    
                    {/* SVG Panah Kanan Tipis */}
                    <svg className="h-3 w-3 text-white opacity-40 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                
                {/*Teks Menumpuk Vertikal*/}
                <div className="flex flex-col text-left mt-auto">
                    <span className="text-white text-[17px] font-bold leading-tight tracking-wide">
                        Class
                    </span>
                    <span className="text-white text-[17px] font-bold leading-tight tracking-wide">
                        Playlist
                    </span>
                </div>
            </a>
        </div>
    )
}

export default BoxSpotify;