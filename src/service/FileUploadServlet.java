package service;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
@WebServlet("/fileUploadservlet")
public class FileUploadServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;
	//private final String UPLOAD_DIRECTORY = "../img/data";
	//private final String UPLOAD_DIRECTORY = this.getServletContext().getRealPath("/data");   
	   
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	//String UPLOAD_DIRECTORY = this.getServletContext().getRealPath("/data");
    	String UPLOAD_DIRECTORY = "./WebContent/data";
    	System.out.println(UPLOAD_DIRECTORY);
    	PrintWriter writer = response.getWriter();
        //process only if its multipart content
        if(ServletFileUpload.isMultipartContent(request)){
            try {
                List<FileItem> multiparts = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);
               
                for(FileItem item : multiparts){
                    if(!item.isFormField()){
                        String name = new File(item.getName()).getName();
                        item.write(new File(UPLOAD_DIRECTORY + File.separator + name));
                    }
                }
                
               //File uploaded successfully
               writer.print("File Uploaded Successfully");
            } catch (Exception ex) {
            	writer.print("File Upload Failed due to " + ex);
            }          
          
        }else{
        	writer.print("Sorry this Servlet only handles file upload request");
        }
        writer.flush();
        //request.getRequestDispatcher("/result.jsp").forward(request, response);      
    }
}
