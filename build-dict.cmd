cmd/c ptk dump ylz ylz.off
cmd/c ptk listwords ylz.off zhwiki-20230701-pages-articles-multistream-index.txt
copy/Y ylz.off-listwords.csv ylz-wikipedia.csv
cmd/c ptk listwords ylz.off fgdcd-entries.txt
copy/Y ylz.off-listwords.csv ylz-fgdzd.csv
cmd/c ptk listwords ylz.off dfb-entries.txt
copy/Y ylz.off-listwords.csv ylz-dfb.csv
node gen-dictentry.js

copy/Y off\zentries.tsv ..\dharmacloud\off\