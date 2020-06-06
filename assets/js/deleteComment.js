import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentCount = document.getElementById("jsCommentCount");
let deleteBtnList;

const decreaseCommentCount = () => {
  commentCount.innerHTML = parseInt(commentCount.innerHTML, 10) - 1;
};

const removeComment = (commentId) => {
  const commentToRemove = document.getElementById(commentId);
  commentToRemove.remove();
  decreaseCommentCount();
};

const deleteComment = async (commentId) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/deletecomment`,
    method: "POST",
    data: {
      commentId,
    },
  });
  if (response.status === 200) {
    removeComment(commentId);
  }
};

function handleCommentDelete(event) {
  // event.preventDefault();
  const li = event.target.closest("li");
  deleteComment(li.id);
}

function init() {
  deleteBtnList = commentList.getElementsByClassName(
    "video__comment-delete-btn"
  );
  for (const deleteBtn of deleteBtnList) {
    deleteBtn.addEventListener("click", handleCommentDelete);
  }
}

if (commentList) {
  init();
}

export default handleCommentDelete;
