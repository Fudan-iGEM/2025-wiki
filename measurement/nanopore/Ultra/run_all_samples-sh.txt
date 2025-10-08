#!/bin/bash

# 遍历所有样本目录
for dir in 42UR2 UT2r UT3r UT6r UR4 UO1r UO5r
do
    echo "===== Processing sample: $dir ====="
    
    cd $dir || { echo "Failed to enter directory $dir"; exit 1; }

    FASTQ=$(ls *.fastq 2>/dev/null)
    REF=$(ls *.fa 2>/dev/null)
    OUTDIR="pipeline_results"
    mkdir -p $OUTDIR

    if [[ -z "$FASTQ" || -z "$REF" ]]; then
        echo "⚠️ Missing input files in $dir, skipping..."
        cd ..
        continue
    fi

    # Step 1: NanoPlot
    NanoPlot --fastq $FASTQ --outdir ${OUTDIR}/nanoplot_results -t 64

    # Step 2: Mapping + Sorting
    minimap2 -ax map-ont $REF $FASTQ | \
    samtools view -b -F 2048 | \
    samtools sort -o ${OUTDIR}/primary_aligned.bam

    # Step 3: Index
    samtools index ${OUTDIR}/primary_aligned.bam

    # Step 4: Depth
    samtools depth ${OUTDIR}/primary_aligned.bam > ${OUTDIR}/depth.txt

    # Step 5: Base distribution
    samtools mpileup -f $REF ${OUTDIR}/primary_aligned.bam | \
    awk '{
        printf "%s\t%s\t%s\t", $1, $2, $3;
        gsub(/\^./, "", $5);
        gsub(/\$/, "", $5);

        a = gsub(/[aA]/, "&", $5);
        c = gsub(/[cC]/, "&", $5);
        g = gsub(/[gG]/, "&", $5);
        t = gsub(/[tT]/, "&", $5);
        n = gsub(/[nN]/, "&", $5);
        ref_match = gsub(/[.,]/, "&", $5);
        
        total = a + c + g + t + n + ref_match;
        printf "A:%d(%.1f%%)\tC:%d(%.1f%%)\tG:%d(%.1f%%)\tT:%d(%.1f%%)\tN:%d(%.1f%%)\tRef_match:%d(%.1f%%)\tTotal:%d\t%.1f%%\n",
               a, (a/total)*100, c, (c/total)*100, g, (g/total)*100,
               t, (t/total)*100, n, (n/total)*100, ref_match, (ref_match/total)*100, total, (ref_match/total)*100;
    }' > ${OUTDIR}/base_distribution.txt

    echo "✅ Finished sample: $dir"
    cd ..
done

echo "🎉 All samples processed successfully!"
