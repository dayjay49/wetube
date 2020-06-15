import axios from "axios";
import handleCommentDelete from "./deleteComment";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentCount = document.getElementById("jsCommentCount");

const increaseCommentCount = () => {
  commentCount.innerHTML = parseInt(commentCount.innerHTML, 10) + 1;
};

const addComment = (comment, id) => {
  const li = document.createElement("li");
  li.setAttribute("id", id);
  const span = document.createElement("span");
  span.innerHTML = comment;

  const button = document.createElement("button");
  const i = document.createElement("i");

  li.appendChild(span);

  i.classList.add("fas", "fa-trash-alt");
  button.classList.add("video__comment-delete-btn");
  button.addEventListener("click", handleCommentDelete);
  button.appendChild(i);
  li.appendChild(button);

  commentList.prepend(li);
  increaseCommentCount();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/addcomment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment, response.data.commentId);
  }
};

function handleCommentSubmit(event) {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
}

function init() {
  addCommentForm.addEventListener("submit", handleCommentSubmit);
}

if (addCommentForm) {
  init();
}
