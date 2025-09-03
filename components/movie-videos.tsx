import { API_URL } from "../app/constants";
import styles from "../styles/movie-videos.module.css";

interface MovieVideosProps {
  id: string;
}

type Video = {
  id: string;
  key: string;
  name: string;
  type: string;
}

async function getVideos(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

export default async function MovieVideos({ id }: MovieVideosProps) {
  const videos = await getVideos(id);
  
  // const priorityVideos = videos.filter(video => // 중요한 비디오만 먼저 표시 (예: 트레일러, 티저 등)
  //   video.name?.toLowerCase().includes('trailer') || 
  //   video.name?.toLowerCase().includes('teaser') || 
  //   video.type === 'Trailer'
  // );
  
  // const initialVideos = priorityVideos.length > 0 ? priorityVideos : videos; // 우선순위가 있는 비디오나 전체 비디오 가져오기

  return (
    <div className={styles.container}>
      {videos.map((video: Video) => (
        <iframe
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.name}
        />
      ))}
    </div>
  );
}