document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const fontStyles = document.querySelector('.font-styles');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');

    // Define base fonts (family names)
    const baseFonts = [
        { name: 'गोटू', family: 'Gotu' },
        { name: 'मोदक', family: 'Modak' },
        { name: 'श्रीखंड', family: 'Srikhand' },
        { name: 'टेको', family: 'Teko' },
        { name: 'कलम', family: 'Kalam' },
        { name: 'नोटो सैन्स', family: 'Noto Sans Devanagari' },
        { name: 'तिल्लाना', family: 'Tillana' },
        { name: 'ग्लेगू', family: 'Glegoo' },
        { name: 'बालू 2', family: 'Baloo 2' },
        { name: 'इंक नट', family: 'Inknut Antiqua' },
        { name: 'पॉपिन्स', family: 'Poppins' },
        { name: 'आर्य', family: 'Arya' },
        { name: 'हिन्द', family: 'Hind' },
        { name: 'जैनी पूर्वा', family: 'Jaini Purva' },
        { name: 'पालकी डार्क', family: 'Palanquin Dark' },
        { name: 'मुक्ता', family: 'Mukta' },
        { name: 'तिरो देवनागरी', family: 'Tiro Devanagari Hindi' },
        { name: 'बालू भाई', family: 'Baloo Bhai 2' },
        { name: 'कर्मा', family: 'Karma' },

        { name: 'बालू तम्बी', family: 'Baloo Thambi 2' },
        { name: 'रोझा वन', family: 'Rozha One' },

        { name: 'बालू पाजी', family: 'Baloo Paaji 2' },
        { name: 'बालू चेट्टन', family: 'Baloo Chettan 2' },
        { name: 'अनेक देवनागरी', family: 'Anek Devanagari' },
        { name: 'बालू भैना', family: 'Baloo Bhaina 2' },
        { name: 'यंत्रमानव', family: 'Yantramanav' },
        { name: 'कम्बे', family: 'Cambay' },
        { name: 'खुला', family: 'Khula' },
        { name: 'मार्टेल', family: 'Martel' },
        { name: 'सरला', family: 'Sarala' },
        { name: 'यात्रा वन', family: 'Yatra One' },
        { name: 'बिरयानी', family: 'Biryani' },
        { name: 'साहित्य', family: 'Sahitya' },
        { name: 'अमिता', family: 'Amita' },
        { name: 'एक्ज़ार', family: 'Eczar' },
        { name: 'हलन्त', family: 'Halant' },
        { name: 'लैला', family: 'Laila' },
        { name: 'राजधानी', family: 'Rajdhani' },

        { name: 'रंगा', family: 'Ranga' },
        { name: 'डेको', family: 'Dekko' },

        { name: 'सूर्य', family: 'Sura' },
        { name: 'असर', family: 'Asar' },
        { name: 'कैथी', family: 'Noto Sans Kaithi' },

        { name: 'खंड', family: 'Khand' },
        { name: 'पटुआ', family: 'Patua One' },
        { name: 'प्रगति', family: 'Pragati Narrow' },

        { name: 'जल्दी', family: 'Jaldi' },
        { name: 'कुराले', family: 'Kurale' },
        { name: 'सुमन', family: 'Sumana' },
        { name: 'वेस्पर', family: 'Vesper Libre' },
        { name: 'कड़वा', family: 'Kadwa' },
        { name: 'रोडियम', family: 'Rhodium Libre' },


        { name: 'जैनी', family: 'Jaini' },

        { name: 'पालकी', family: 'Palanquin' },

        { name: 'नोटो सेरिफ', family: 'Noto Serif Devanagari' },
        { name: 'तिरो संस्कृत', family: 'Tiro Devanagari Sanskrit' },
        { name: 'तिरो मराठी', family: 'Tiro Devanagari Marathi' },
        { name: 'अन्नपूर्णा', family: 'Annapurna SIL' },
        { name: 'अक्षर', family: 'Akshar' },
        { name: 'अमीको', family: 'Amiko' },

    ];

    // Style Effects (CSS classes)
    const styleEffects = [
        { name: '', class: '', label: 'Normal' },
        { name: 'Bold', class: 'style-bold', label: 'Bold' },
        { name: 'Italic', class: 'style-italic', label: 'Italic' },
        { name: 'Shadow', class: 'style-shadow', label: 'Shadow' },
        { name: 'Outline', class: 'style-outline', label: 'Outline' },
        { name: '3D', class: 'style-3d', label: '3D' },
        { name: 'Hearts', class: 'style-hearts', label: 'Decor' },
        { name: 'Stars', class: 'style-stars', label: 'Decor' },
        { name: 'Brackets', class: 'style-brackets', label: 'Decor' },
        { name: 'Underline', class: 'style-underline', label: 'Line' },
        { name: 'Double', class: 'style-double', label: 'Outline' }
    ];

    // Generate massive list of styles (Cartesian product of fonts x simple effects)
    // We won't multiply EVERY font by EVERY effect to avoid 700+ pages, 
    // but we can create a curated "massive" list.
    // However, the user asked for "massive styles" like the site.
    // Let's create a healthy mix. 

    // Strategy: 
    // 1. All Base Fonts (Normal)
    // 2. Select popular fonts for Effects

    let styles = [];

    // 1. Add all base fonts
    baseFonts.forEach(font => {
        styles.push({
            name: font.name,
            family: font.family,
            className: '',
            displayName: font.name
        });
    });

    // 2. Add effects for diverse fonts (picking some good display fonts)
    const displayFonts = baseFonts.filter(f => ['Poppins', 'Baloo 2', 'Modak', 'Teko', 'Rozha One', 'Kalam', 'Ranga', 'Srikhand', 'Gotu'].includes(f.family));

    displayFonts.forEach(font => {
        // Add Shadow, 3D, Outline for these
        styles.push({ name: `${font.name} 3D`, family: font.family, className: 'style-3d', displayName: `${font.name} 3D` });
        styles.push({ name: `${font.name} Shadow`, family: font.family, className: 'style-shadow', displayName: `${font.name} Shadow` });
        styles.push({ name: `${font.name} Outline`, family: font.family, className: 'style-outline', displayName: `${font.name} Outline` });
    });

    // 3. Add decorations to Handwriting fonts
    const handwrittenFonts = baseFonts.filter(f => ['Kalam', 'Amita', 'Laila', 'Dekko', 'Tillana'].includes(f.family));
    handwrittenFonts.forEach(font => {
        styles.push({ name: `${font.name} Hearts`, family: font.family, className: 'style-hearts', displayName: `${font.name} ♥` });
        styles.push({ name: `${font.name} Stars`, family: font.family, className: 'style-stars', displayName: `${font.name} ★` });
    });

    // 4. Add Bold/Italic variants for standard fonts
    const textFonts = baseFonts.filter(f => ['Noto Sans Devanagari', 'Hind', 'Mukta', 'Poppins', 'Tiro Devanagari Hindi'].includes(f.family));
    textFonts.forEach(font => {
        styles.push({ name: `${font.name} Bold`, family: font.family, className: 'style-bold', displayName: `${font.name} Bold` });
        styles.push({ name: `${font.name} Italic`, family: font.family, className: 'style-italic', displayName: `${font.name} Italic` });
    });

    // Shuffle slightly or just keep sorted? Keep sorted by "Normal" then effects? 
    // Current order: All Normal -> Display Effects -> Decor -> Basic Variants.
    // That seems fine for "massive" scroll.

    // Pagination settings
    const itemsPerPage = 12;
    let currentPage = 1;
    let totalPages = Math.ceil(styles.length / itemsPerPage);

    // Update pagination display
    function updatePagination() {
        totalPages = Math.ceil(styles.length / itemsPerPage); // Recalculate
        currentPageSpan.textContent = currentPage;
        totalPagesSpan.textContent = totalPages;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    // Function to create style boxes for current page
    function createStyleBoxes() {
        fontStyles.innerHTML = ''; // Clear existing styles
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, styles.length);

        styles.slice(startIndex, endIndex).forEach(style => {
            const box = document.createElement('div');
            box.className = 'font-style-box';

            const title = document.createElement('h3');
            title.textContent = style.displayName || style.name;

            const text = document.createElement('p');
            text.style.fontFamily = style.family;
            if (style.className) {
                text.classList.add(style.className);
            }
            text.style.fontSize = '1.2rem';
            text.style.minHeight = '60px';
            text.style.display = 'flex';
            text.style.alignItems = 'center';
            text.style.justifyContent = 'center';
            text.style.textAlign = 'center';
            text.style.margin = '1rem 0';

            // Apply specific styles contextually if needed (e.g. outline color)
            // The CSS classes handle most of it.

            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'button-group';

            // Font Download Button
            const fontDownloadBtn = document.createElement('button');
            fontDownloadBtn.className = 'copy-btn';
            fontDownloadBtn.innerHTML = '<i class="fas fa-font"></i> Font Download';

            fontDownloadBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                const originalText = fontDownloadBtn.innerHTML;
                fontDownloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

                try {
                    // 1. Construct Google Fonts API URL (using the older 'css' endpoint as per reference pattern)
                    // Reference used: .replace("css2", "css")
                    const fontName = style.family.replace(/ /g, '+');
                    const cssUrl = `https://fonts.googleapis.com/css?family=${fontName}`;

                    // 2. Fetch the CSS content
                    const response = await fetch(cssUrl);
                    if (!response.ok) throw new Error('Failed to fetch font info');
                    const css = await response.text();

                    // 3. Extract the font file URL using Regex (looking for url(...) inside font-face)
                    const match = css.match(/url\((.*?)\)/);
                    if (match && match[1]) {
                        const fontFileUrl = match[1].replace(/['"]/g, "");

                        // 4. Create and click specific download link
                        const link = document.createElement("a");
                        link.href = fontFileUrl;
                        link.download = `${style.family.replace(/ /g, '-')}.woff2`; // Google usually serves woff2
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        fontDownloadBtn.innerHTML = '<i class="fas fa-check"></i> Done!';
                    } else {
                        throw new Error('Font URL not found');
                    }
                } catch (err) {
                    console.error('Download logic failed:', err);
                    // Fallback to new tab if the fancy logic fails
                    window.open(`https://fonts.google.com/specimen/${style.family.replace(/ /g, '+')}`, '_blank');
                    fontDownloadBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Opened Page';
                }

                setTimeout(() => {
                    fontDownloadBtn.innerHTML = originalText;
                }, 2000);
            });

            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'download-btn';
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Image Download';

            buttonGroup.appendChild(fontDownloadBtn);
            buttonGroup.appendChild(downloadBtn);

            box.appendChild(title);
            box.appendChild(text);
            box.appendChild(buttonGroup);

            fontStyles.appendChild(box);

            // Download button functionality (Image)
            downloadBtn.addEventListener('click', async () => {
                try {
                    // Create a temporary div for the image
                    const tempDiv = document.createElement('div');
                    tempDiv.style.padding = '20px';
                    tempDiv.style.background = 'white';
                    tempDiv.style.position = 'fixed';
                    tempDiv.style.left = '-9999px';
                    tempDiv.style.top = '0';

                    // Create the text element with the same style
                    const textElement = document.createElement('p');
                    textElement.style.fontFamily = style.family;
                    if (style.className) {
                        textElement.classList.add(style.className);
                    }
                    textElement.textContent = text.textContent;
                    textElement.style.fontSize = '2rem';
                    textElement.style.margin = '0';
                    textElement.style.padding = '20px';
                    textElement.style.textAlign = 'center';
                    textElement.style.color = '#000';

                    // Manually handle text stroke for clones if needed (html2canvas sometimes glitches with webkit-text-stroke)
                    // But usually allowTaint: true helps.

                    tempDiv.appendChild(textElement);
                    document.body.appendChild(tempDiv);

                    // Wait for font to load
                    await document.fonts.load(`1rem "${style.family}"`);

                    // Convert to canvas
                    const canvas = await html2canvas(tempDiv, {
                        backgroundColor: 'white',
                        scale: 3,
                        logging: false,
                        allowTaint: true,
                        useCORS: true,
                        onclone: (clonedDoc) => {
                            const clonedElement = clonedDoc.querySelector('p');
                            clonedElement.style.fontFamily = style.family;
                            // Ensure class is preserved
                            if (style.className) {
                                clonedElement.classList.add(style.className);
                            }
                        }
                    });

                    // Remove temporary div
                    document.body.removeChild(tempDiv);

                    // Convert to image and download
                    const image = canvas.toDataURL('image/png');
                    const link = document.createElement('a');
                    link.href = image;
                    link.download = `hindi-style-${style.name.replace(/ /g, '-')}-${Date.now()}.png`;
                    link.click();

                    // Show success feedback
                    const originalText = downloadBtn.innerHTML;
                    downloadBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
                    setTimeout(() => {
                        downloadBtn.innerHTML = originalText;
                    }, 2000);
                } catch (err) {
                    console.error('Download failed:', err);
                }
            });
        });
    }

    // Pagination button handlers
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            createStyleBoxes();
            updatePagination();
            updateText();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            createStyleBoxes();
            updatePagination();
            updateText();
        }
    });

    // Update text in all style boxes
    function updateText() {
        const text = inputText.value || 'यहाँ आपका टेक्स्ट दिखेगा...';
        document.querySelectorAll('.font-style-box p').forEach(p => {
            p.textContent = text;
        });
    }

    // Input text change handler
    inputText.addEventListener('input', updateText);

    // Initialize
    createStyleBoxes();
    updatePagination();

    // Input action buttons
    const clearBtn = document.querySelector('.clear-btn');
    const pasteBtn = document.getElementById('paste-btn');
    const clearAllBtn = document.getElementById('clear-all-btn');

    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        updateText();
    });

    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            inputText.value = text;
            updateText();
        } catch (err) {
            console.error('Failed to paste:', err);
        }
    });

    clearAllBtn.addEventListener('click', () => {
        inputText.value = '';
        updateText();
    });
});