$(".editPost").click(function(e)
{
    let postID = $(this).attr("id");
    let postTitle = $('#title').val();
    let postAuthor = $('#author').val();
    let postContent = $('#content').val();
    console.log(postTitle);
    console.log(postContent);
    ;
    console.log("fucking Idiot");
    var params =
    {
        id: postID,
        title: postTitle,
        author: postAuthor,
        content: postContent

    }
    console.log(params);
    
    console.log(postID);
    let base_url = location.protocol +"//" + document.domain + ":" + location.port;
    console.log(base_url);
    $.ajax(
        {
            url: base_url +"/admin/post/edit/"+postID,
            type: "PUT",
            data: params,
            dataType: "json",
            success: function(res)
            {
                console.log("success");
            }
        
        }
    )
})