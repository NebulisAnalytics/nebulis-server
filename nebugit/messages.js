import colors from 'colors';
const logoText = `                                                     .,,,, 
                                              ,;;;;;;,.    
    Nebulis Analytics                   ,;;;;:             
    Code Monitoring Server          :;;;,                  
    v%s                      :;;;                       
                            .;;;.                          
                         .;;;               .:;;;;;;;;;;.  
                       ;;;,             ;;;';.      ,;;;;; 
                     ;;;.             :,              :;;; 
                   :;;                                ;;;  
                  ;;;           :;;;;;;              ;;;   
                 .;;;;       ;;;;;;;;               ;;;    
                  ;;;;;,   :;;;;;,   .;,          :;;      
                                   ;;;;         :;;.       
                                .;;;;:        ;;;.         
                              ;;;;;        ,;;:            
 '                        ,;;;;;         ';,               
.;;;                 .;;;;;;.         ';                   
  ;;;;;;::,,::;;;;;;;;;:.                                  
     ,:;;;;;;;;;:,.\n`;

const connectionText = `🔥  Nebulis git subsystem is listening on %s:%s`.magenta;
const listenerConnectionText = '🔥  Nebulis Listener is listening on http://%s:%s'.magenta;

const messages = {
  logo: () => { console.log(logoText, '0.1.0'); },
  connectionInfo: (ip, port) => { console.log(connectionText, ip, port)},
  listenerConnectionInfo: (host, port) => {console.log(listenerConnectionText, host, port)},
  killed: () => { console.log(killedText); }
};

export { messages as default };