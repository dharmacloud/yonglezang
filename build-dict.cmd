cmd/c ptk js ylz-tg
cmd/c ptk dump ylz-tg ylz-tg.off
cmd/c ptk listwords ylz-tg.off zhwiki-20230701-pages-articles-multistream-index.txt
copy/Y ylz-tg.off-listwords.csv ylz-wikipedia.csv
cmd/c ptk listwords ylz-tg.off fgdcd-entries.txt
copy/Y ylz-tg.off-listwords.csv ylz-fgdzd.csv
cmd/c ptk listwords ylz-tg.off dfb-entries.txt
copy/Y ylz-tg.off-listwords.csv ylz-dfb.csv
node gen-dictentry.js ylz-tg.offtext

cmd/c ptk js ylz-vny
cmd/c ptk dump ylz-vny ylz-vny.off
cmd/c ptk listwords ylz-vny.off zhwiki-20230701-pages-articles-multistream-index.txt
copy/Y ylz-vny.off-listwords.csv ylz-wikipedia.csv
cmd/c ptk listwords ylz-vny.off fgdcd-entries.txt
copy/Y ylz-vny.off-listwords.csv ylz-fgdzd.csv
cmd/c ptk listwords ylz-vny.off dfb-entries.txt
copy/Y ylz-vny.off-listwords.csv ylz-dfb.csv
node gen-dictentry.js ylz-vny.offtext

cmd/c ptk js ylz-svk
cmd/c ptk dump ylz-svk ylz-svk.off
cmd/c ptk listwords ylz-svk.off zhwiki-20230701-pages-articles-multistream-index.txt
copy/Y ylz-svk.off-listwords.csv ylz-wikipedia.csv
cmd/c ptk listwords ylz-svk.off fgdcd-entries.txt
copy/Y ylz-svk.off-listwords.csv ylz-fgdzd.csv
cmd/c ptk listwords ylz-svk.off dfb-entries.txt
copy/Y ylz-svk.off-listwords.csv ylz-dfb.csv
node gen-dictentry.js ylz-svk.offtext

cmd/c ptk js ylz-prjn
cmd/c ptk dump ylz-prjn ylz-prjn.off
cmd/c ptk listwords ylz-prjn.off zhwiki-20230701-pages-articles-multistream-index.txt
copy/Y ylz-prjn.off-listwords.csv ylz-wikipedia.csv
cmd/c ptk listwords ylz-prjn.off fgdcd-entries.txt
copy/Y ylz-prjn.off-listwords.csv ylz-fgdzd.csv
cmd/c ptk listwords ylz-prjn.off dfb-entries.txt
copy/Y ylz-prjn.off-listwords.csv ylz-dfb.csv
node gen-dictentry.js ylz-prjn.offtext