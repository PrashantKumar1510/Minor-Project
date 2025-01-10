import {useState , useEffect} from 'react'
import lang from "../lannguage";


function Translator(){

    const [fromText,setFromText]=useState('');
    const [toText,setToText]=useState('');
    const [fromLanguage,setfromLanguage]=useState('en-GB');
    const [toLanguage,setToLanguage]=useState('hi-IN');
    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState({});

    useEffect(() => {
        setLanguages(lang);
    }, []);


    const handleTranslate = ()=>{
        setLoading(true)
        let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`
        fetch(url).then((res)=>res.json()).then((data)=>{
            setToText(data.responseData.translatedText);
            setLoading(false);
        })
    }

    const handleExchange = ()=>{
        let temp = fromText;
        setFromText(toText)
        setToText(temp);

        let lang = fromLanguage;
        setfromLanguage(toLanguage)
        setToLanguage(lang)
        console.log('h');
    }

    const copyContent = (text) => {
        navigator.clipboard.writeText(text);
    }
    const utterText = (text, language) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        synth.speak(utterance);
    }
    function handleiconClick(target,id){
        if (!fromText || !toText) return;
        if(target.classList.contains('fa-copy')) {
            if(id === 'from'){
                copyContent(fromText)
            }else{
                copyContent(toText)
            }
        }else{
            if (id === 'from') {
                utterText(fromText, fromLanguage);
            } else {
                utterText(toText, toLanguage);
            }
        }
    }

    return(<>
       <div>
         <div className="wrapper">
            <div className="text-input">
            <textarea name="from" id="from" placeholder="Entter your text" className="from-text"  value={fromText} onChange={(e) => setFromText(e.target.value)}></textarea>
            <textarea name="to" id="to" placeholder="result!" className="result-text"  value={toText} readOnly></textarea>
            </div>
            <ul className="control">
                <li className="row from">
                  <div className="icon">
                  <i id="from" className="fa-solid fa-volume-high"  onClick={(e)=>{handleiconClick(e.target,'from')}}></i>
                  <i id="from" className="fa-solid fa-copy" onClick={(e)=>{handleiconClick(e.target,'from')}}></i>
            
                  </div>
                  <select value={fromLanguage}  onChange={(event)=>{setfromLanguage(event.target.value)}}>
                   {Object.entries(lang).map(([code,name])=>(
                    <option key={code} value={code}>{name}</option>
                   ))}
                  </select>
                </li> 

                <li className="exchage"  onClick={handleExchange}>
                <i className="fa-solid fa-arrow-right-arrow-left"></i>
                </li>


                <li className="row to">
                 <select value={toLanguage} onChange={(event)=>{setToLanguage(event.target.value)}}>
                 {Object.entries(lang).map(([code,name])=>(
                    <option key={code} value={code} >{name}</option>
                   ))}
                 </select>
                  <div className="icon">
                    <i id="to" className="fa-solid fa-copy"  onClick={(e)=>{handleiconClick(e.target,'to')}}></i>
                     <i id="to" className="fa-solid fa-volume-high"  onClick={(e)=>{handleiconClick(e.target,'to')}}></i>
                  </div>
                </li>
            </ul>
         </div>
         <button onClick={handleTranslate}>
         {loading ? 'Translating...' : 'Translate Text'}
         </button>
       </div>
       
       </>);
}

export default Translator