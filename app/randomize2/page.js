"use client"; // Needed for useState, useRouter, event handlers

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// Adjust paths: From 'app/randomize2/' go up two levels ('../../') then into 'components/'
import HoverOverlay from "../components/hoverOverlay";
import Legend from "../components/Legend";

export default function Randomize2Page() {
    const router = useRouter();
    const [blockSize, setBlockSize] = useState(10);
    const [randomization, setRandomization] = useState([]);
    const numBlocks = 2;
    const numTreatments = 2;

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
        router.push("/finalpage"); // Use Next.js router push
    };

    const handleBlocksChange = (e) => {
        setBlockSize(e.target.value);
    };

    const submitRunClick = () => {
        const currentBlockSize = parseInt(blockSize, 10); // Ensure blockSize is a number
        if (isNaN(currentBlockSize) || currentBlockSize < 2 || currentBlockSize > 10) {
            alert("Block size must be a number between 2 and 10");
            setBlockSize(10); // Reset to default if invalid
        } else if (currentBlockSize % numTreatments !== 0) {
             alert("Block size must be divisible by the number of treatments (2)");
        }
        else {
            // Use the helper function defined above
            setRandomization(createBlockRandomization(numBlocks, currentBlockSize));
        }
    };


    return (
        // --- JSX structure from original randomize2.js ---
        <div className="randomize-2-container">
            <div className="top">
                <h3>Hover over the code for a detailed description.</h3>
                <h3>
                    Change block_size (must be an even number between 2 and 10), and click "RUN CODE" to view Block Randomization.
                </h3>
            </div>

            <div className="randomize-2-body-container">
                <div className="code-container">
                    {/* --- R Code Simulation JSX with HoverOverlay from original randomize2.js --- */}
                    <div className="code">
                         {/* Wrap in form for semantics, prevent default submit */}
                        <form onSubmit={(e) => { e.preventDefault(); submitRunClick(); }}>
                           <HoverOverlay overlayText="The viridisLite package will be used to assign colors to different treatments.">
                                <div>library<span className="spanY">(</span>viridisLite<span className="spanY">)</span></div>
                            </HoverOverlay>
                            <br/>
                            <HoverOverlay overlayText={`The number of blocks (${numBlocks}) indicates how many sets of random assignments will be generated. There are ${numTreatments} treatments. The block_size is set to ${blockSize} (changeable) and must be divisible by ${numTreatments}.`}>
                                <div><span className="spanG"># In how many blocks will subjects be randomized?</span></div>
                                <div>n_blocks &lt;- <span className="spanLG">{numBlocks}</span></div>
                                <div><br></br></div>
                                <div><span className="spanG"># How many treatments are we using?</span></div>
                                <div>n_treatments &lt;- <span className="spanLG">{numTreatments}</span></div>
                                <div><br></br></div>
                                <div><span className="spanG"># What is the block size? (Must be a multiple of number of treatments.)</span></div>
                                <div>block_size &lt;-{" "}
                                    <span className="spanLG">
                                        <input
                                            type="number" // Use type number for better validation
                                            value={blockSize}
                                            onChange={handleBlocksChange}
                                            className="custom-input"
                                            min="2" // Add min/max for basic validation
                                            max="10"
                                            step="2" // Assuming only even numbers are valid as per description
                                            style={{ width: '30px', color: 'rgb(199, 235, 199)', backgroundColor: 'black', border: 'none', textAlign: 'center'}} // Basic styling
                                        />
                                    </span>
                                </div>
                                <div>stopifnot<span className="spanY">(</span>block_size %% n_treatments == 0<span className="spanY">)</span></div>
                            </HoverOverlay>
                            <br/>
                            <HoverOverlay overlayText="rep(seq(n_treatments), block_size %/% n_treatments): Generates treatment labels repeated to fill the block size. sample(): Shuffles treatments within each block. replicate(): Replicates randomized blocks.">
                                <div><span className="spanG"># Generate random orders of treatments</span></div>
                                <div>treatments_in_block &lt;- rep<span className="spanY">(</span>seq<span className="spanP">(</span>n_treatments<span className="spanP">)</span>,</div>
                                <div className="indentLarge">block_size %/% n_treatments<span className="spanY">)</span></div>
                                <div>study_blocks &lt;-</div>
                                <div className="indent">sample<span className="spanY">(</span>treatments_in_block<span className="spanY">)</span> |&gt;</div>
                                <div className="indent">replicate<span className="spanY">(</span>n = n_blocks<span className="spanY">)</span></div>
                                <div className="indent">t<span className="spanY">()</span></div>
                            </HoverOverlay>
                             <br/>
                             <HoverOverlay overlayText="Visualize the treatment orders using colors.">
                                <div><span className="spanG"># Visualize the treatment orders</span></div>
                                <div>treatment_colors &lt;- inferno<span className="spanY">(</span>n_treatments<span className="spanY">)</span></div>
                             </HoverOverlay>
                             <HoverOverlay overlayText="Adjust plotting parameters (margins, clipping).">
                                <div>par<span className="spanY">(</span>xpd = <span className="spanB">FALSE</span>, mar = c<span className="spanP">(</span><span className="spanLG">5</span>, <span className="spanLG">4</span>, <span className="spanLG">4</span>, <span className="spanLG">11</span><span className="spanP">)</span><span className="spanY">)</span></div>
                            </HoverOverlay>
                             <HoverOverlay overlayText='Create an image plot showing treatment order in blocks using colors.'>
                                <div>image<span className="spanY">(</span>study_blocks,</div>
                                <div className="indent">col = treatment_colors,</div>
                                <div className="indent">xlab = <span className="spanO">"Block"</span>,</div>
                                <div className="indent">axes = <span className="spanB">FALSE</span><span className="spanY">)</span></div>
                             </HoverOverlay>
                             <HoverOverlay overlayText='Add labeled axes for blocks and a grid. Adds a legend outside the plot area.'>
                                <div>axis<span className="spanY">(</span><span className="spanLG">1</span>, at = seq<span className="spanP">(</span><span className="spanLG">0</span>, <span className="spanLG">1</span>, length.out = n_blocks<span className="spanP">)</span>, labels = seq<span className="spanP">(</span>n_blocks<span className="spanP">)</span><span className="spanY">)</span></div>
                                <div>grid<span className="spanY">(</span>nx = n_blocks, ny = blockSize, col = "red", lty =<span className="spanLG"> 1</span>, lwd =<span className="spanLG"> 1</span><span className="spanY">)</span></div>
                                <div>par<span className="spanY">(</span>xpd = <span className="spanB">TRUE</span><span className="spanY">)</span></div>
                                <div>legend<span className="spanY">(</span><span className="spanLG">1</span> + <span className="spanLG">1.25</span> / n_blocks, <span className="spanLG">1</span>,</div>
                                <div className="indent">legend = c<span className="spanP">(</span><span className="spanO">"Treatment"</span>, <span className="spanO">"Control"</span><span className="spanP">)</span>, fill = treatment_colors<span className="spanY">)</span></div>
                                <br></br>
                             </HoverOverlay>
                        </form>
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
                    type="button" // Changed to button to prevent form submission if not using onSubmit
                    className="button"
                    onClick={submitRunClick} // Keep direct onClick handler
                    value="RUN CODE"
                />
                <input
                    type="button"
                    className="button"
                    onClick={submitContinueClick}
                    value="CONTINUE ACTIVITY"
                />
                <br></br>
                <br></br>
            </div>
        </div>
    );
}