// Styles.jsx
const Styles = `
    .card-container { 
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;
        gap: 0px;
        transform: scale(0.93);
        transform-origin: center 0;
    }

    .assessmentcard {
        width: 220px;
        cursor: pointer;
        position: relative;
        transition: all 0.2s;
        overflow: hidden;
        user-select: none;
        aspect-ratio: 5 / 7;
        box-sizing: border-box;
        border: 11px solid;
        border-radius: 14px;
        background-color: white;
    }

    .missioncard {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 220px;
        aspect-ratio: 5 / 7;
        border: 11px solid #FCE18F;
        position: relative;
        overflow: hidden;
        user-select: none;
        box-sizing: border-box;
        border-radius: 14px;
        background-color: white;
    }

    .card-header {
        font-size: 18px;
        font-weight: bold;
        margin: 10px 20px 0;
    }

    .card-body {
        margin: 10px 20px;
    }

    .who-is-assessed .cardCategory {
        background-color: var(--who-is-assessed-color);
    }

    .the-assessor .cardCategory {
        background-color: var(--the-assessor-color);
    }

    .assessment-artefact .cardCategory {
        background-color: var(--assessment-artefact-color);
    }

    .assessment-format .cardCategory {
        background-color: var(--assessment-format-color);
    }

    .context .cardCategory {
        background-color: var(--context-color);
    }

    .assessment-timing .cardCategory {
        background-color: var(--assessment-timing-color);
    }

    .cardCategory {
        color: white;
        font-size: 18px;
        font-weight: bold;
        padding: 6px;
        height: 38px;
        line-height: 20px;
        text-transform: uppercase;
        align-content: center;
        margin-bottom: 4px;
    }
    

    .assessmentcard.who-is-assessed {
        border-color: var(--who-is-assessed-border-color);
    }

    .assessmentcard.the-assessor {
        border-color: var(--the-assessor-border-color);
    }

    .assessmentcard.assessment-artefact {
        border-color: var(--assessment-artefact-border-color);
    }

    .assessmentcard.assessment-format {
        border-color: var(--assessment-format-border-color);
    }

    .assessmentcard.context {
        border-color: var(--context-border-color);
    }

    .assessmentcard.assessment-timing {
        border-color: var(--assessment-timing-border-color);
    }

    .cardText {
        padding: 6px;
    }

    .card:hover {
        border-bottom-right-radius: 50px;
        box-shadow: 80px 90px 28px -90px rgba(0, 0, 0, 0.65);
    }


    h2 {
        font-size: 16px;
        margin: 0;
    }

    p {
        font-size: 12px;
    }

    .card-number {
        position: absolute;
        bottom: 5px;
        right: 10px;
        font-size: 20px;
        font-weight: bold;
        transition: all 0.2s;
    }

`;

export default Styles;