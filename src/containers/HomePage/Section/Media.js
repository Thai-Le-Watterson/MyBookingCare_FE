import React from "react";
import "./Media.scss";

class Media extends React.Component {
    render() {
        return (
            <div className="media-container container">
                <div className="row">
                    <iframe
                        className="video col-12 col-sm-12 col-lg-8 mb-4"
                        src="https://www.youtube.com/embed/ukHK1GVyr0I"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                    <p className="media-content col-12 col-sm-12 col-lg-4">
                        Là một giáo viên đang công tác tại vùng khó khăn, mình
                        đã rất xúc động khi xem MV này. Bài hát rất ý nghĩa.
                        Động lực cho những thầy cô giáo như chúng mình cố gắng
                        chịu khó, chịu khổ là đây chứ đâu. Cảm ơn anh Đen rất
                        nhiều &gt;3 &gt;3 &gt;3
                    </p>
                </div>
            </div>
        );
    }
}

export default Media;
