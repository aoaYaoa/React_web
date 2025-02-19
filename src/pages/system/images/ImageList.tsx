import { useState, useEffect, useCallback } from 'react';
import { Card, Row, Col, Spin, Image, Empty } from 'antd';
import { getRandomPhoto } from '@/services/pexels';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './ImageList.module.scss';

interface PexelsImage {
  id: number;
  photographer: string;
  photographer_url: string;
  src: {
    large: string;
    tiny: string;
  };
}

export function ImageList() {
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchImages = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    
    try {
      // 每页加载 12 张图片
      const promises = Array(12).fill(null).map(() => 
        getRandomPhoto('technology,business,modern,office')
      );
      const newImages = await Promise.all(promises);
      
      setImages(prev => {
        // 去重
        const uniqueImages = newImages.filter(img => 
          !prev.some(prevImg => prevImg.id === img.id)
        );
        return [...prev, ...uniqueImages];
      });
      
      setPage(p => p + 1);
      // 最多加载 5 页
      setHasMore(page < 5);
    } catch (error) {
      console.error('Failed to fetch images:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, page]);

  useEffect(() => {
    fetchImages();
  }, []);

  if (images.length === 0 && !loading) {
    return <Empty description="暂无图片" />;
  }

  return (
    <Card title="图片管理" className="page-card">
      <div className={styles.container} id="scrollableDiv">
        <InfiniteScroll
          dataLength={images.length}
          next={fetchImages}
          hasMore={hasMore}
          loader={<div className={styles.loading}><Spin tip="加载中..." /></div>}
          endMessage={<div className={styles.endMessage}>没有更多图片了</div>}
          scrollableTarget="scrollableDiv"
        >
          <Row gutter={[16, 16]}>
            {images.map((image) => (
              <Col xs={24} sm={12} md={8} lg={6} key={image.id}>
                <Card 
                  hoverable 
                  className={styles.imageCard}
                  cover={
                    <Image
                      alt={image.photographer}
                      src={image.src.large}
                      placeholder={
                        <div className={styles.imagePlaceholder}>
                          <Spin />
                          <Image
                            preview={false}
                            src={image.src.tiny}
                            alt={image.photographer}
                            style={{ display: 'none' }}
                          />
                        </div>
                      }
                    />
                  }
                >
                  <Card.Meta
                    title={image.photographer}
                    description={
                      <a href={image.photographer_url} target="_blank" rel="noopener noreferrer">
                        查看作者主页
                      </a>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </div>
    </Card>
  );
} 