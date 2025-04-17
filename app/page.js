"use client"; // Needed for useState and useRouter

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Legend from "./components/Legend"; // Adjusted import path

export default function Randomize1Page() {
    const router = useRouter();
    const [randomization, setRandomization] = useState([]);
    let numBlocks = 5;
    let blockSize = 5;
    let numTreatments = 2;

    // --- Helper Functions (from original file) ---
    function createBlockRandomization(numBlocks, blockSize) {
        let blockRandomization = [];
        for (let i = 0; i < numBlocks; i++) {
            let block = [];
            // Fill the block with equal numbers of each group
            for (let j = 0; j < blockSize / numBlocks; j++) {
                block.push("purple1");
                block.push("purple2");
            }
            // Shuffle the block
            block = shuffleArray(block);
            blockRandomization = blockRandomization.concat(block);
        }

        let outArray = []
        outArray.push(" ");
        outArray.push(" ");
        for (let k = 0; k < blockRandomization.length; k++) {
            outArray.push(blockRandomization[k]);
        }

        for (let k = 1; k <= numTreatments; k++) {
            outArray.push(k);
        }

        for (let k = 1; k <= numTreatments; k++) {
            if (k === 1) {
                outArray.push("Blo");
            } else if (k === 2) {
                outArray.push("ck");
            } else {
                outArray.push(" ");
            }
        }
        return outArray;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap
        }
        return array;
    }

    function arrayOutput(item) {
        if (item === "purple1") {
            return <div className="block1"></div>;
        } else if (item === "purple2") {
            return <div className="block2"></div>;
        } else if (item === "Blo") {
            return <div className="Blo">{item}</div>;
        } else if (item === "ck") {
            return <div className="ck"> {item}</div>;
        } else {
            return <div className="block0">{item}</div>;
        }
    }
    // --- End Helper Functions ---

    const submitContinueClick = () => {
        router.push("/randomize2"); // Use Next.js router push
    };

    const submitRunClick = () => {
        // Use the helper function defined above
        setRandomization(createBlockRandomization(numBlocks, blockSize));
    };

    return (
        // --- JSX structure from original randomize1.js ---
        <div className="randomize-1-container">
            <div className="top">
                <h2>Let&apos;s Visualize Block Randomization.</h2>
                <h4>
                    Block randomization is as simple as hitting a button! Free
                    software packages such as{" "}
                    <i>blockrand, randomizR, or pspych in R</i> can randomize
                    your study.
                </h4>
                <h4>
                    But what is happening under the hood? Click &quot;RUN CODE&quot; on
                    this R code to see a visualization of a block randomized
                    study with 2 treatments.
                </h4>
            </div>

            <div className="container">
                <div className="code-container">
                    {/* --- R Code Simulation JSX from original randomize1.js --- */}
                    <div className="code">

                        <div><br></br></div>
                        <div><span className="spanG"># Install required packages</span></div>
                        <div>installed.packages<span className="spanY">(</span><span className="spanO">&quot;blockrand&quot;, &quot;tidyverse&quot;</span><span className="spanY">)</span></div>

                        <div><br></br></div>
                        <div><span className="spanG"># Load required packages</span></div>
                        <div>library<span className="spanY">(</span>blockrand<span className="spanY">)</span></div>
                        <div>library<span className="spanY">(</span>tidyverse<span className="spanY">)</span></div>

                        <div><br></br></div>
                        <div><span className="spanG"># Create block randomization allocation sequence using blockrand package</span></div>
                        <div>block_rand &lt;- blockrand(n = 30, <span className="spanG"># target number of samples</span></div>
                        <div className="indent">num.levels = 2, <span className="spanG"># number of treatment arms</span></div>
                        <div className="indent">levels = c(&quot;Treatment&quot;, &quot;Control&quot;), <span className="spanG"># arm names</span></div>
                        <div className="indent">block.sizes = c(5), <span className="spanG"># times arms for fixed block</span></div>
                        <div className="indent">block.prefix = &quot;Block&quot;) <span className="spanG"># block names</span></div>

                        <div><br></br></div>
                        <div><span className="spanG"># Add sequential position within each block</span></div>
                        <div>block_rand &lt;- block_rand %&gt;%</div>
                        <div className="indent">group_by(block.id) %&gt;%</div>
                        <div className="indent">mutate(position_in_block = row_number()) %&gt;%</div>
                        <div className="indent">ungroup()</div>

                        <div><br></br></div>
                        <div><span className="spanG"># Create visualization of the block randomization</span></div>
                        <div>ggplot(block_rand, aes(x = position_in_block, y = factor(block.id, levels =</div>
                        <div>rev(unique(block.id))))) +</div>
                        <div className="indent">geom_tile(aes(fill = treatment), color = &apos;gray30&apos;, width = 0.9, height = 0.9) +</div>
                        <div className="indent">geom_text(aes(label = id), color = &quot;black&quot;, size = 3) +</div>
                        <div className="indent">scale_fill_brewer(palette = &quot;Set1&quot;, name = &quot;Treatment&quot;) +</div>
                        <div className="indent">labs(title = &quot;Block randomization of samples by block&quot;</div>
                        <div className="indent2">subtitle = paste(length(unique(block_rand$block.id)), &quot;blocks with&quot;,</div>
                        <div className="indent4">unique(block_rand$block.size),</div>
                        <div className="indent4">&quot;samples per block, randomized to&quot;,</div>
                        <div className="indent4">length(unique(block_rand$treatment)), &quot;treatments)&quot;,</div>
                        <div className="indent2">x = &quot;Treatment sequence&quot;, y = &quot;Block&quot;) +  # Removed x-axis label</div>
                        <div className="indent">theme_minimal() +</div>
                        <div className="indent">theme(</div>
                        <div className="indent2">panel.grid = element_blank(),</div>
                        <div className="indent2">axis.text.x = element_blank(),  # Remove x-axis text</div>
                        <div className="indent2">axis.ticks.x = element_blank()  # Remove x-axis ticks</div>
                        <div className="indent">)</div>



                        <div><br></br></div>
                        <div>ggsave(&quot;plots/01_block-randomization.png&quot;, width = 8, height = 4, dpi = 400)</div>
                        <div>ggsave(&quot;plots/01_block-randomization.svg&quot;, width = 8, height = 4, dpi = 400)</div>
                        <br></br>
                    </div>
                    {/* --- End R Code Simulation --- */}
                </div>

                {/* If randomization array is not empty, display the legend and block chart */}
                {randomization.length > 0 && (
                    <div className="chart-container">
                        <div className="legend-container">
                            <Legend />
                        </div>
                        <div className="block-chart2">
                            {/* Add key prop for mapped elements */}
                            {randomization.map((item, index) => (
                                <React.Fragment key={index}>
                                    {arrayOutput(item)}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div>
                <input
                    className="button"
                    type="button"
                    onClick={submitRunClick}
                    value="RUN CODE"
                />
                <input
                    className="button"
                    type="button"
                    onClick={submitContinueClick}
                    value="CONTINUE ACTIVITY"
                />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}