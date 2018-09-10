console.log("You are idiot");
$(".deletePost").click(function(e)
{
    let postID = $(this).attr("id");
    let params =
    {
        id: postID,
        

    }
    
    console.log(postID);
    let base_url = location.protocol +"//" + document.domain + ":" + location.port;
    console.log(base_url);
    $.ajax(
        {
            url: base_url +"/admin",
            type: "DELETE",
            data: params,
            dataType: "json",
            success: function(res)
            {
                location.reload();
            }
        
        }
    )
})

