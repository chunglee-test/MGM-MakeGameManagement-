package org.test.ajax;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.test.ajax.service.BoardDAO;
import org.test.ajax.service.CuisineDAO;
import org.test.ajax.service.OrderDAO;
import org.test.ajax.util.FileService;
import org.test.ajax.vo.CHboard;
import org.test.ajax.vo.CHcuisine;
import org.test.ajax.vo.CHorder;
import org.test.ajax.vo.CHreply;

import org.test.ajax.util.PageNavigator;

@Controller
@RequestMapping("board")
public class boardController {

	private static final Logger logger = LoggerFactory.getLogger(boardController.class);

	@Autowired
	BoardDAO dao;
	
	@Autowired
	CuisineDAO cdao;
	 
	@Autowired
	OrderDAO odao;

	final int countPerPage = 10;			//페이지 당 글 수
	final int pagePerGroup = 5;		
	final String uploadPath = "/boardfile";	
	
	@RequestMapping("/about")
	public String about() {
		return "/board/about";
	}
	
	@RequestMapping("/cuisineBoard")
	public String cuisineBoard() {
		return "/board/cuisineBoard";
	}
	
	@RequestMapping("/writeform")
	public String writeform() {
		return "/board/writeform";
	}
	
	@RequestMapping("/orderform")
	public String orderform() {
		return "/board/orderform";
	}
	
	@RequestMapping("/write")
	public String write( 
			CHboard board, MultipartFile upload, HttpSession session,
			Model model) {
		String id = (String) session.getAttribute("loginId");
		board.setId(id);
		
		if (!upload.isEmpty()) {
			String savedfile = FileService.saveFile(upload, uploadPath);
			board.setOriginalfile(upload.getOriginalFilename());
			board.setSavedfile(savedfile);
		}
		dao.insert(board);
		return "redirect:../";
	}
	
	@RequestMapping (value="list", method=RequestMethod.GET)
	public String list(
			@RequestParam(value="page", defaultValue="1") int page,
			@RequestParam(value="searchText", defaultValue="") String searchText,
			Model model) {
		logger.debug("page: {}, searchText: {}", page, searchText);
		
		int total = dao.getTotal(searchText);			//전체 글 개수
		
		//페이지 계산을 위한 객체 생성
		PageNavigator navi= new PageNavigator(countPerPage, pagePerGroup, page, total);
		
		//검색어와 시작 위치, 페이지당 글 수를 전달하여 목록 읽기
		ArrayList<CHboard> boardlist = dao.listBoard(searchText, navi.getStartRecord(), navi.getCountPerPage());	
		
		//페이지 정보 객체와 글 목록, 검색어를 모델에 저장
		model.addAttribute("boardlist", boardlist);
		model.addAttribute("navi", navi);
		model.addAttribute("searchText", searchText);
		return "board/list";
	}
	@RequestMapping (value="read", method=RequestMethod.GET)
	public String read(int boardnum, Model model) {
		//전달된 글 번호로 해당 글정보 읽기
		CHboard board = dao.get(boardnum);
		if (board == null) {
			return "redirect:list";
		}
		
		//해당 글에 달린 리플목록 읽기
		ArrayList<CHreply> replylist = dao.listReply(boardnum);
		//본문글정보와 리플목록을 모델에 저장
		model.addAttribute("board", board);
		model.addAttribute("replylist", replylist);
		return "board/read";
	}
	/**
	 * 파일 다운로드
	 * @param boardnum 파일이 첨부된 글 번호
	 */
	@RequestMapping(value = "download", method = RequestMethod.GET)
	public String fileDownload(int boardnum, Model model, HttpServletResponse response) {
		CHboard board = dao.get(boardnum);
		
		//원래의 파일명
		String originalfile = new String(board.getOriginalfile());
		try {
			response.setHeader("Content-Disposition", " attachment;filename="+ URLEncoder.encode(originalfile, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		//저장된 파일 경로
		String fullPath = uploadPath + "/" + board.getSavedfile();
		
		//서버의 파일을 읽을 입력 스트림과 클라이언트에게 전달할 출력스트림
		FileInputStream filein = null;
		ServletOutputStream fileout = null;
		
		try {
			filein = new FileInputStream(fullPath);
			fileout = response.getOutputStream();
			
			//Spring의 파일 관련 유틸
			FileCopyUtils.copy(filein, fileout);
			
			filein.close();
			fileout.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}
	
	/**
	 * 글 삭제
	 * @param boardnum 삭제할 글번호
	 */
	@RequestMapping (value="delete", method=RequestMethod.GET)
	public String delete(int boardnum, HttpSession session) {
		String id = (String) session.getAttribute("loginId");
		
		//삭제할 글 번호와 본인 글인지 확인할 로그인아이디
		CHboard board = new CHboard();
		board.setBoardnum(boardnum);
		board.setId(id);
		
		//첨부된 파일이 있는지 먼저 확인
		String savedfile = dao.get(boardnum).getSavedfile();
		
		//글 삭제
		int result = dao.deleteBoard(board);
		
		//글 삭제 성공 and 첨부된 파일이 있는 경우 파일도 삭제
		if (result == 1 && savedfile != null) {
			FileService.deleteFile(uploadPath + "/" + savedfile);
		}
		
		return "redirect:list";
	}
	
	/**
	 * 글 수정 폼으로 이동
	 * @param boardnum 수정할 글번호
	 * @return 해당 번호의 글 정보
	 */
	@RequestMapping (value="edit", method=RequestMethod.GET)
	public String editForm(int boardnum, HttpSession session, Model model) {
		
		CHboard board = dao.get(boardnum);
		model.addAttribute("board", board);
		return "board/editForm";
	}
	/**
	 * 글 수정 처리
	 * @param board 수정할 글 정보
	 */
	@RequestMapping (value="edit", method=RequestMethod.POST)
	public String edit(
			CHboard board, 
			MultipartFile upload,
			HttpSession session) {
		
		//수정할 글이 로그인한 본인 글인지 확인
		String id = (String) session.getAttribute("loginId");
		CHboard oldBoard = dao.get(board.getBoardnum());
		if (oldBoard == null || !oldBoard.getId().equals(id)) {
			return "redirect:list";
		}
		
		//수정할 정보에 로그인 아이디 저장
		board.setId(id);
		
		//수정 시 새로 첨부한 파일이 있으면 기존 파일을 삭제하고 새로 업로드
		if (!upload.isEmpty()) {
			//기존 글에 첨부된 파일의 실제 저장된 이름
			String savedfile = oldBoard.getSavedfile();
			//기존 파일이 있으면 삭제
			if (savedfile != null) {
				FileService.deleteFile(uploadPath + "/" + savedfile);
			}
			
			//새로 업로드한 파일 저장
			savedfile = FileService.saveFile(upload, uploadPath);
			
			//수정 정보에 새로 저장된 파일명과 원래의 파일명 저장
			board.setOriginalfile(upload.getOriginalFilename());
			board.setSavedfile(savedfile);
		}
		
		//글 수정 처리
		dao.updateBoard(board);
		//원래의 글읽기 화면으로 이동 
		return "redirect:read?boardnum=" + board.getBoardnum();
	}
	
	
	@RequestMapping("readFood")
	public String imagef1(int cscode, Model model) {
		//System.out.println(cscode);
		CHcuisine c = cdao.select(cscode);
		model.addAttribute("cuisine", c);
		//System.out.println(c);
		return "board/readFood";
	}
	
	@RequestMapping("order")
	public String order(int num, Model model) {
		model.addAttribute("num", num);
		return "board/order";
	}
	
	@RequestMapping("ordernow")
	public String ordernow(CHorder order, Model model) {
		//System.out.println(order);
		odao.insertOrder(order);
		model.addAttribute("order", order);
		return "redirect:orderComplete";
	}

	@RequestMapping("/orderComplete")
	public String orderComplete(@ModelAttribute("order") CHorder order, 
			SessionStatus sessionStatus, Model model) {
		sessionStatus.setComplete();
		return "board/orderComplete";
	}
	
	@RequestMapping("/checkorder")
	public String gocheckorder(String page, Model model, HttpSession session) {
		int startPage = 1;
		int boardCount = 10;
		int offset = 0; 
		int allboardcount = odao.getOrderCount();
		
		if (page != null) {
			startPage = Integer.parseInt(page);
			//처음페이지가 -가 될때
			if (startPage <= 0) {
				startPage = 1;
			}
			//처음페이지가 가지고 있는 페이지보다 클때
			if((allboardcount/boardCount)+1 < startPage ) {
				startPage = startPage-1;
			}
		}
		offset=(boardCount * startPage)-boardCount;
		
		RowBounds rb = new RowBounds(offset, boardCount);
		
		double randomValue = Math.random();
		int intValue = (int)(randomValue * 9) +1;
		System.out.println(intValue);
		ArrayList<CHorder> olist = odao.orderlist(rb);
		model.addAttribute("olist", olist);
		model.addAttribute("startPage", startPage);
		model.addAttribute("boardcount", allboardcount);
		return "board/ordernow";
	}
	
	@RequestMapping("/gotomypage")
	public String gotomypage() {

		return "redirect:../";
	}
	

	/**
	 * 리플 저장 처리
	 * @param reply 사용자가 입력한 글 내용
	 */
	@RequestMapping (value="replyWrite", method=RequestMethod.POST)
	public String replyWrite(
			CHreply reply, 
			HttpSession session, 
			Model model) {
		
		//세션에서 로그인한 사용자의 아이디를 읽어서 Reply객체의 작성자 정보에 세팅
		String id = (String) session.getAttribute("loginId");
		reply.setId(id);
		
		//리플 정보를 DB에 저장
		dao.insertReply(reply);
		
		//읽던 게시글로 되돌아 감
		return "redirect:read?boardnum=" + reply.getBoardnum();
	}
	
	/**
	 * 리플 삭제
	 * @param reply 삭제할 리플 번호와 본문 글번호가 전달
	 */
	@RequestMapping (value="replyDelete", method=RequestMethod.GET)
	public String deleteReply(CHreply reply, HttpSession session) {
		String id = (String) session.getAttribute("loginId");
		
		//삭제할 글 번호와 본인 글인지 확인할 로그인아이디
		reply.setId(id);
		
		dao.deleteReply(reply);
		return "redirect:read?boardnum=" + reply.getBoardnum();
	}
	
	/**
	 * 리플 수정 처리
	 * @param reply 수정할 리플 정보
	 */
	@RequestMapping (value="replyEdit", method=RequestMethod.POST)
	public String replyEdit(
			CHreply reply, 
			HttpSession session) {
		
		//삭제할 리플 정보와 본인 글인지 확인할 로그인아이디
		String id = (String) session.getAttribute("loginId");
		reply.setId(id);
		
		//리플  수정 처리
		dao.updateReply(reply);
		//원래의 글읽기 화면으로 이동 
		return "redirect:read?boardnum=" + reply.getBoardnum();
	}
	
	
}
