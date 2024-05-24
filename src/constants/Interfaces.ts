export interface FeatureSong{
  id?:number,
  url?:string,
  title?:string,
  genre?:{},
  artists?:artist[],
  album?:album,
  lyric?:string,
  brand_image?:string,
  total_play_count?:number,
  cover_image?:string,
  composed_by?:string,
  released_date?:string,
  song_type?:string,
  moods?:[],
  description?:string,
  lyricist_name?:string,
  languages?:[],
  status?:string,
  duration?:number,
  download_uri?:string,
  tags?:[],
  favourites_count?:number,
  favourited?:boolean,
  created_at?:string,
}

export interface album{
  id:number,
  title:string
}

export interface artist {
  id:number,
  email:string,
  status:string,
  created_at:string,
  updated_at:string,
  profile:artistProfile,
  favourited:boolean,
  balance:any,
  followers_count:number,
  is_lead:boolean,
}

export interface artistProfile{
  id:number,
  name:string,
  country:string,
  address:string,
  facebook:string,
  twitter:string,
  instagram:string,
  youtube:string,
  bio:string,
  about:string,
  profile_picture:string,
  dob:string,
}


export interface advertisement{
  id:number,
  key:string,
  title:string,
  image:{url:string},
  url:string,
  slug:string,
  status:boolean,
  start_date:string,
  end_date:string,
  remarks:string,
  position:number,
  views:number,
  created_at:string,
  updated_at:string,
}

export interface adsRequest{
  location:string,
  platform:string
}

export interface userProfile{
  id:number,
  created_at:string,
  country:string,
  address:string,
  updated_at:string,
  user_id:number,
  name:string,
  facebook:string,
  twitter:string,
  instagram:string,
  youtube:string,
  bio:string,
  profile_picture:{
    url:string,
  },
  dob:string,
  about:string,
}
export interface user{
  id:number,
  email:string,
  role:string,
  providers:string,
  provider_data:string[],
  notification_settings:{},
  profile:userProfile
}


export interface Genre {
  id:number,
  title:string,
  description:string,
  cover_image:string,
  background_image: {
    url:string,
  },
  featured_genre:boolean,
  favourites_count:number,
  favourited:boolean,
  status: string,
  songs: {
      data:FeatureSong[],
  }
}