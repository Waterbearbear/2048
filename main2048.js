//初始化为数组后，发生了什么
var board = new Array(); 
var score = 0;


$(document).ready(function(){
	newgame();
});


function newgame(){
	//初始化棋盘格
	init();
	
	//在棋盘格上生成数字
	generateOneNumber();
	generateOneNumber();
	
}


function init(){
	//给小格子赋值
	
	for(var i = 0;i < 4; i++)
	{
		for(var j = 0;j < 4;j++)
		{
			var gridCell = $("#grid-cell-" + i +"-" + j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}
		
	for(var i = 0;i<4 ;i++)
	{
		board[i] = new Array();
		for(var j = 0;j < 4;j ++)
		{
			board[i][j] = 0;
		}
	}
	// debugger;
	
	updateBoardView();
}


function updateBoardView(){
	
	$(".number-cell").remove()
	
	for(var i = 0; i<4;i++)
	{
		for(var j = 0; j < 4;j++)
		{
			$("#grid-contatiner").append('<div class="number-cell" id="number-cell-'+ i +'-'+ j +'"></ div>  ')
			
			var theNumberCell = $("#number-cell-" + i + "-" + j );
			
			if(board[i][j] == 0)
			{
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				
				// 居中有什么用？
				theNumberCell.css('top',getPosTop(i,j) + 50);
				theNumberCell.css('left',getPosLeft(i,j) + 50);
			}
			else
			{
				theNumberCell.css('width','100px');
				theNumberCell.css('height','100px');
				
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
		}
	}
}


function generateOneNumber(){
	//等移动结束后再生成出来
	
	
	//判断棋盘还有无位置
	if (nospace( board) )
	{
		return false;
	}
	
	//找到一个随机位置
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));
	
	//位置可能已经被用，需要重新选取位置
	while(true)
	{
		if(board[randx][randy] == 0)
		{
			break;
		}
		else
		{
			randx = parseInt(Math.floor(Math.random() * 4));
			randy = parseInt(Math.floor(Math.random() * 4));
		}
	}
	
	//生成一个随机数
	var randNumber = Math.random() < 0.5?2:4;
	
	//修改对应Board的位置
	board[randx][randy] = randNumber;
	
	//显示对应数字位置
	showNumberAnimation(randx,randy,randNumber);
	
	return true;
}

$(document).keydown(function(event){
	
	switch(event.keyCode )
	{
		case 37: //left
			if( moveLeft() )
			{
				generateOneNumber();
				isgameover();
			}
			break;
		
		case 38: //up
			if( moveUp() )
			{
				generateOneNumber();
				isgameover();
			}
			break;
			
		case 39: //right
			if( moveRight() )
			{
				generateOneNumber();
				isgameover();
			}
			break;
		
		case 40://down
			if( moveDown() )
			{
				generateOneNumber();
				isgameover();
			}
			break;
		default:
			break;
	}
	
});

function isgameover()
{
	// alert("game over!");
}


function moveLeft()
{
	if(!canMoveLeft(board))
	{
		return false;
	}
	
	//后续
	//这边逻辑修改为,遇到了一个数,从该数往左扫描落点位置
	
	
	//移动的位置:1.空位  2.相同数字的位置
	for(var i = 0 ;i<4;i++)
	{
		for(var j=1;j<4;j++)
		{
			if(board[i][j] != 0)
			{
				for(var k = 0 ;k<j;k++)
				{
					if(board[i][k] == 0  && noBlockHorizontal(i,k,j,board))
					{
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]  = board[i][j];
						board[i][j]  = 0;
						
						
						//为什么加个continue
						continue;
					}
					else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board))
					{
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]  += board[i][j];
						board[i][j]  = 0;
						
						
						//同上
						continue;
					}
				}
			}
		}
	}
	
	setTimeout("updateBoardView()",200);
	
	return true;
}

function moveRight()
{
	if(!canMoveRight(board))
	{
		return false;
	}
	
	//后续
	//这边逻辑修改为,遇到了一个数,从该数往左扫描落点位置
	
	
	//移动的位置:1.空位  2.相同数字的位置
	for(var i = 0 ;i<4;i++)
	{
		for(var j=0;j<3;j++)
		{
			if(board[i][j] != 0)
			{
				for(var k = 3 ;k>j;k--)
				{
					if(board[i][k] == 0  && noBlockHorizontal(i,j,k,board))
					{
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]  = board[i][j];
						board[i][j]  = 0;
						
						
						//为什么加个continue
						continue;
					}
					else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board))
					{
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]  += board[i][j];
						board[i][j]  = 0;
						
						
						//同上
						continue;
					}
				}
			}
		}
	}
	
	setTimeout("updateBoardView()",200);
	
	return true;
}



function moveUp()
{
	if(!canMoveUp(board))
	{
		return false;
	}
	
	//后续
	//这边逻辑修改为,遇到了一个数,从该数往左扫描落点位置
	
	
	//移动的位置:1.空位  2.相同数字的位置
	for(var i = 1 ;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			if(board[i][j] != 0)
			{
				for(var k = 0 ;k<i;k++)
				{
					if(board[k][j] == 0  && noBlockVertical(k,i,j,board))
					{
						//move
						showMoveAnimation(i,j,i,k);
						board[k][j]  = board[i][j];
						board[i][j]  = 0;
						
						
						//为什么加个continue
						continue;
					}
					else if(board[k][j] == board[i][j] && noBlockVertical(k,i,j,board))
					{
						//move
						showMoveAnimation(i,j,i,k);
						board[k][j]  += board[i][j];
						board[i][j]  = 0;
						
						
						//同上
						continue;
					}
				}
			}
		}
	}
	
	setTimeout("updateBoardView()",200);
	
	return true;
}

