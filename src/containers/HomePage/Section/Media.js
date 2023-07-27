import React from "react";
import "./Media.scss";

class Media extends React.Component {
    render() {
        return (
            <div className="media-container">
                <iframe
                    className="video"
                    src="https://www.youtube.com/embed/ukHK1GVyr0I"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                ></iframe>
                <p className="media-content">
                    Là một giáo viên đang công tác tại vùng khó khăn, mình đã
                    rất xúc động khi xem MV này. Bài hát rất ý nghĩa. Động lực
                    cho những thầy cô giáo như chúng mình cố gắng chịu khó, chịu
                    khổ là đây chứ đâu. Cảm ơn anh Đen rất nhiều &gt;3 &gt;3
                    &gt;3
                </p>
            </div>
        );
    }
}

export default Media;
