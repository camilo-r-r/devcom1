// Remove command prefix
PennController.ResetPrefix(null)
PennController.AddHost("https://filedn.com/lDf2Oa0trFMzhcSFiv5VDuu/Pictures_pilot2/")

// Turn off debugger
DebugOff()

// first, create function to pseudo-randomize item presentation 

function RandomizeNoMoreThan(predicate,n) {
    this.args = [predicate];
    this.run = function(arrays) {
        let moreThanN = true;
        let order;
        while (moreThanN){
            order = randomize(predicate).run(arrays);
            moreThanN = false;
            let previousType = "";
            let current_n = 0;
            for (let i = 0; i < order.length; i++){
                let currentType = order[i][0].type;
                if (currentType != previousType){
                    current_n = 1;
                    previousType = currentType;
                }
                else{
                    current_n++;
                    if (current_n > n){
                        moreThanN = true;
                        break;
                    }
                }
            }
        }
        return order;
    };
}
function randomizeNoMoreThan(predicate, n) {
    return new RandomizeNoMoreThan(predicate,n);
}


// Control trial sequence
Sequence("welcome","practice", randomize("practiceTrials"), "expIntro", randomizeNoMoreThan(anyOf("critical","filler"),1),"exitform", "send", "bye")

// re-set counter 

SetCounter("counter", "inc", 1);


// we start with a welcome screen
PennController( "welcome",
    defaultText
        .print()
    ,
    
    newText("text1", "<h2>Welcome!</h2>")
        .css({"font-size": "large"})
    ,
    newImage("logo", "oslo_logo.png")
         .size(162, 129)
         .center()
         .print()
    ,
    newText("text3", "<p>Thank you for your participation. This is a study about language comprehension conducted by the University of Oslo.</p>")
            .css({"font-size": "large"})
    ,
    newText("text4", "<p>You are going to read a few sentences and and choose among pictures related to these sentences.</p>")
            .css({"font-size": "large"})
    ,
    newText("text5", "<p>The experiment will take about 10 minutes. Please make sure to complete the experiment without interruption.</p>")
          .css({"font-size": "large"})
    ,
    newText("text6", "<p>It is important that you complete the task in a quiet environment. Please turn off your computer's speakers throughout the experiment. </p>")
          .css({"font-size": "large"})
    ,
    newText("text2", "<p>Your task will be explained in the following pages.</p>")
          .css({"font-size": "large"})
    ,
      
    newButton("button1", "Continue")
        .print()
        .wait()
        
    ,
    getText("text1")
        .remove()
    ,
    getText("text3")
        .remove()
    ,
    getText("text4")
        .remove()
    ,
    getText("text5")
        .remove()
    ,
    getText("text2")
        .remove()
    ,
    getText("text6")
        .remove()
    ,
    
    
    getImage("logo")
        .remove()
    ,
                
    getButton("button1")
        .remove()

    ,
    
    newHtml("consentInfo", "consentInfo.html")
        .settings.log()
        .print()
    ,
    newButton("button2", "Continue")
        .print()
        .wait(getHtml("consentInfo").test.complete()
            .failure( getHtml("consentInfo").warn() ) // wait and display warning message if not all the obligatory fields in the html document are filled
          )
    ,
    getHtml("consentInfo")
        .remove()
    ,
    getButton("button2")
        .remove()
    ,
    fullscreen()
    ,
    newHtml("instructions", "instructions.html")
        .print()
    ,    

    newKey("continue", " ")
        .once()
        .wait()
     
    ,
    getHtml("instructions")
        .remove()
    ,

    getKey("continue")
        .remove()
    ,
    
    newHtml("instructions2", "instructions2.html")
        .print()
    ,

    newKey("continue2", " ")
        .once()
        .wait()
        
    ,
                
    getHtml("instructions2")
        .remove()
   ,
                
   getKey("continue2")
        .remove()
    
    ,
   
    newHtml("instructions3", "instructions3.html")
        .print()
    ,

    newKey("continue3", " ")
        .once()
        .wait()
   ,

    
    
    getHtml("instructions3")
        .remove()
    ,

    getKey("continue3")
        .remove()
   
    
    
    
)
// practice round 
PennController( "practice",
    defaultText
        .print()
    ,
    newText("text-test", "<h2>Practice round</h2>")
        .css({"font-size": "large"})
    ,
    newText("text-test2", "<p>You will now go through a short practice round to get the hang of the task.</p> <p> <strong>As soon as you press the SPACEBAR, the first trial will begin!</strong></p>")
            .css({"font-size": "large"})
    ,        
     newText("text-test3", "Remember to keep your hands in the position shown in the picture below.")
            .css({"font-size": "large"})
    ,
      newImage("hands1", "hands.jpg")
                     .size(520, 320)
                     .print()
    ,
    newKey("continue4", " ")
        .once()
        .wait()
    ,

    getText("text-test")
        .remove()
    ,
    getText("text-test2")
        .remove()
    ,
    getText("text-test3")
        .remove()
    ,
    getKey("continue4")
        .remove()
   
    
)

// practice trials
Template("practice_round.csv",row =>
    newTrial("practiceTrials",
        newText("sep1", "Wait for next trial...")
                      .settings.css("font-size", "x-large")
                      .print(),
                      newTimer(1000)
                      .start()
                      .wait()
                      .remove(),
                      getText("sep1")
                      .remove(),
        newText("context-sentence", row.context_sentence)
                    .cssContainer({"font-size": "160%", "color": "black"})
                    .center()
                    .print()
        ,
        newTimer("wait", 2000)
            .start()
            .wait()
        ,    
        newKey("continue5", " ")
                    .once()
                    .wait()
        ,
        getText("context-sentence")
                    .remove()
        ,
        newText("target-sentence", row.target_sentence)
                    .cssContainer({"font-size": "160%", "color": "black"})
                    .center()
                    .print()
        ,
        newText("space", " ")
                    .print()
        ,
    newTimer("wait2", 1000)
            .start()
            .wait()
        ,  
        newImage("control-picture", row.control_picture)
                     .size(400, 300)
        ,
        newImage("neither-picture", row.neither_picture)
                     .size(400, 300)
        , 
        newImage("target-picture", row.target_picture)
                    .size(400, 300)
        ,    
        newCanvas("side-by-side", 950,200)
            .add(  -100, 0, getImage("control-picture"))
            .add(300, 0, getImage("neither-picture"))
            .add(700, 0, getImage("target-picture"))
            .center()
            .print()
            .log()
        ,
        newSelector("selection")
            .disableClicks()
            .add( getImage("control-picture") 
            , getImage("target-picture"))
            .shuffle()
            .add(getImage("neither-picture") )
            //I think I fixed it, but it might have affected the keys' order
            .keys("F","B","J")
            .log()
            .once()
            .wait()
            
)
         .log("list", row.list)
         .log("condition", row.condition)
         .log("Item", row.item)
         .log("context", row.context)
         .log("picture", row.pictures)
         .log("context_sentence", row.context_sentence)
         .log("target_sentence", row.target_sentence)
         .log("adjective", row.adjective)
         .log("correct_answer", row.correct)
        .log("target_picture", row.target_picture)
        .log("control_picture", row.control_picture)
        .log("picture_1", row.Picture_1)
        .log("picture_3", row.Picture_3)
)
  //  .log("log-results",  )

// experiment beginning
PennController( "expIntro",
    defaultText
        .print()
    ,
    newText("text-main", "<h2>Great job!</h2>")
        .css({"font-size": "large"})
    ,
    newText("text-main2", "<p>Now the real Experiment will start. Remember: It is very important that you keep your hands in the position shown in the picture below! Press the SPACEBAR to begin.</p>")
            .css({"font-size": "large"})
    ,
      newImage("hands", "hands.jpg")
                     .size(520, 320)
                     .print()
    ,                 
   
     newKey("continue6", " ")
                    .once()
                    .wait()
        ,
    
    getText("text-main")
        .remove()
    ,
    getText("text-main2")
        .remove()
)

// Experimental trials
Template("Pilot_main_w.fillers.csv",row =>  
    newTrial(row.condition_randomizer,
        newText("sep", "Wait for next trial...")
                      .settings.css("font-size", "x-large")
                      .print(),
                      newTimer(1000)
                      .start()
                      .wait()
                      .remove(),
                      getText("sep")
                      .remove(),
        newText("context-sentence", row.context_sentence)
                    .cssContainer({"font-size": "160%", "color": "black"})
                    .center()
                    .print()
        ,
        newTimer("wait", 2000)
            .start()
            .wait()
        ,
        newKey("continue6", " ")
                    .once()
                    .wait()
        ,
        getText("context-sentence")
                    .remove()
        ,
        newText("target-sentence", row.target_sentence)
                    .cssContainer({"font-size": "160%", "color": "black"})
                    .center()
                    .print()
        ,
        newText("space", " ")
                    .print()
        ,

     newTimer("wait2", 1000)
            .start()
            .wait()
        ,  
        newImage("control-picture", row.control_picture)
                     .size(400, 300)
        ,
        newImage("neither-picture", row.neither_picture)
                     .size(400, 300)
        , 
        newImage("target-picture", row.target_picture)
                    .size(400, 300)
        ,    
        newCanvas("side-by-side", 950,200)
            .add(  -100, 0, getImage("control-picture"))
            .add(300, 0, getImage("neither-picture"))
            .add(700, 0, getImage("target-picture"))
            .center()
            .print()
            .log()
        ,
        newSelector("selection")
            .disableClicks()
            .add( getImage("control-picture") 
            , getImage("target-picture"))
            .shuffle()
            .add(getImage("neither-picture") )
            //I think I fixed it, but it might have affected the keys' order
            .keys("F","J","B")
            .log()
            .once()
            .wait()
       // ,
       // getSelector("selection").log("all")

            
            
)
         .log("list", row.list)
         .log("condition", row.condition)
         .log("Item", row.item)
         .log("context", row.context)
         .log("picture", row.pictures)
         .log("context_sentence", row.context_sentence)
         .log("target_sentence", row.target_sentence)
         .log("adjective", row.adjective)
         .log("correct_answer", row.correct)
        .log("target_picture", row.target_picture)
        .log("control_picture", row.control_picture)
        .log("picture_1", row.Picture_1)
        .log("picture_3", row.Picture_3)




)

newTrial("exitform",  
         newHtml("debrief", "debrief.html")
         .print()
         .log(),
         newButton("Submit answers")
         .print()
         .wait(),
         getHtml("debrief")
         .remove()
         
        )


  //  .log("log-results",  )

PennController.SendResults( "send" );


PennController("bye",
    newText("<p>This is the end of the experiment. Thank you for your participation!</p>")
        .print()
    ,
    newCanvas("empty6", 1, 10)
        .print()
    ,
    newText("<p><a href='https://app.prolific.co/submissions/complete?cc=4925D823' target='_blank'>Click here to confirm your participation.</a></p>")
        .print()
    ,
    newText("<p>You can close the window now.</p>")
        .print()
    ,
    newButton("void") // create an empty button that makes the screen stay
        .wait()
  )
