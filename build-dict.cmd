cmd/c ptk dump ylz-m ylz-m.off
cmd/c ptk listwords ylz-m.off zhwiki-20230701-pages-articles-multistream-index.txt
copy/Y ylz-m.off-listwords.csv ylz-wikipedia.csv
cmd/c ptk listwords ylz-m.off fgdcd-entries.txt
copy/Y ylz-m.off-listwords.csv ylz-fgdzd.csv
cmd/c ptk listwords ylz-m.off dfb-entries.txt
copy/Y ylz-m.off-listwords.csv ylz-dfb.csv
node gen-dictentry.js ylz-m.offtext

cmd/c ptk dump ylz-vny ylz-vny.off
cmd/c ptk listwords ylz-vny.off zhwiki-20230701-pages-articles-multistream-index.txt
copy/Y ylz-vny.off-listwords.csv ylz-wikipedia.csv
cmd/c ptk listwords ylz-vny.off fgdcd-entries.txt
copy/Y ylz-vny.off-listwords.csv ylz-fgdzd.csv
cmd/c ptk listwords ylz-vny.off dfb-entries.txt
copy/Y ylz-vny.off-listwords.csv ylz-dfb.csv
node gen-dictentry.js ylz-vny.offtext

cmd/c ptk dump ylz-svk ylz-svk.off
cmd/c ptk listwords ylz-svk.off zhwiki-20230701-pages-articles-multistream-index.txt
copy/Y ylz-svk.off-listwords.csv ylz-wikipedia.csv
cmd/c ptk listwords ylz-svk.off fgdcd-entries.txt
copy/Y ylz-svk.off-listwords.csv ylz-fgdzd.csv
cmd/c ptk listwords ylz-svk.off dfb-entries.txt
copy/Y ylz-svk.off-listwords.csv ylz-dfb.csv
node gen-dictentry.js ylz-svk.offtext

cmd/c ptk dump ylz ylz.off
cmd/c ptk listwords ylz.off zhwiki-20230701-pages-articles-multistream-index.txt
copy/Y ylz.off-listwords.csv ylz-wikipedia.csv
cmd/c ptk listwords ylz.off fgdcd-entries.txt
copy/Y ylz.off-listwords.csv ylz-fgdzd.csv
cmd/c ptk listwords ylz.off dfb-entries.txt
copy/Y ylz.off-listwords.csv ylz-dfb.csv
node gen-dictentry.js off