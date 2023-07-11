import {  useState } from "react";


const Dictionary = () => {
    const [inputText , setInputText] = useState("")
    const [datas, setData] = useState(null)
    const [error, setError] = useState(null)
    const [display, setDisplay] = useState(false)
    const [word, setWord] = useState("")
    const [partofspeech, Setpartofspeech] = useState("")
    const [phonetic, setPhonetic] = useState("")
    const [meaning, setMeaning] = useState("")
    const [example, setExample] = useState("")
    const [sounds, setSound] = useState("")
    const [synonyms, setSynonyms] = useState("")

   
     const input = e => {
        const input = e.target.value;    
        setInputText(input)
        
    }
    
    const searchInput = (e) => {
        e.preventDefault();  
        
        const api ="https://api.dictionaryapi.dev/api/v2/entries/en";
         fetch(`${api}/${inputText}`)
         .then(res => res.json())   
         .then(data=> {
           setData(datas)
           let meaning = data[0].meanings[0].definitions[0].definition
           setMeaning(meaning)
              let partOfSpeech = data[0].meanings[0].partOfSpeech
              Setpartofspeech(partOfSpeech)
              let sound = data[0].phonetics[1].audio
              let audio = new Audio(`${sound}`)
              setSound(audio)
              let exam = data[0].meanings[1].definitions[0].example
              setExample(exam)
              let phon = data[0].phonetic
              setPhonetic(phon)
              let synonym = data[0].meanings[1].definitions[0].synonyms
              let sin = synonym.join(", ")
             setSynonyms(sin)
             setError(null)
              
             // console.log(data)
           console.log(data[0].phonetic)
          setWord(inputText)
           setDisplay(true)
           setError(false)
    
         }).catch(error => {
            if(error.name === "AbortError") {
                console.log("aborted")
              } else {
                setError("")
    
              }
        
         })}

         const handleSpeaker = () => {
            sounds.play();    
          }
       
    
    return ( 
        <section>
        <div className="container">
            
            {error && <div>{error}</div>}
            <form className="input-container" onSubmit={searchInput}>
            <input className="input" type="text" required onChange={input} placeholder="Search your word here"/>
            <button>Search</button>
            </form>
            <span className="header">{word}</span>
            <div className="sound-con">
                <div className="figure"><span className="one">{phonetic}</span>/<span className="two">{partofspeech} </span></div>
                <button onClick={handleSpeaker} className="speaker">spearker</button>
            </div>
            <div className="meaning">
                <div className="full">
                    { display && <h3>Defination</h3>}
                    <p className="def"> {meaning}</p>
                </div>
                <div className="full">
                    { display && <h3>Example</h3>}
                    <p className="def">{example}</p>
                </div>
                <div className="full">
                    { display && <h3>Synonyms</h3> }
                    <p className="def"> {synonyms}</p>
                </div>
            </div>
            

            
        </div>
        </section>
     );
}
 
export default Dictionary;