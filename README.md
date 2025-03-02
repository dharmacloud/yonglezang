# yonglezang
crop and text data of yonglezang

download mp3



ytdl -q lowest https://youtube.com/watch?v=6SPgY9y4S2c | ffmpeg -i pipe:0 -b:a 96k -vn amtb.mp3

# 梁皇寶籤
https://www.youtube.com/watch?v=syRat0n6KA4&list=PL3bUKE0GLF5I3r-DqcAmr0X8XyeiZg5BX


node crop 產生 ylz 使用的 zip ，每卷一個

node gen-dictentry ptkname


# update time stamp and copy to dharmacloud
node gen-timestamp

#prepare for folioaligner

node gen-folioaligner.js

北藏版別譯雜阿含少了大正版258-268經 婆羅門-摩納 Brahmin - Young Men


待補版：
無量壽經 流支 101 頁


大正錯字，北藏正確
https://dia.dila.edu.tw/uv3/index.html?id=Tv12p0311
大正  隨其功德有所鉉不鉉，各自然趣向，說經行道，[2]卓億萬超絕不相及。」
北藏 隨其功德有所鉉不鉉，各自然趣向，說經行道，百千億萬超絕不相及。」  svv_ruci2  pb21